import React from "react";

export default function CommonFormBuilder({
  schema,
  values,
  onChange,
  submitted,
  onAction,
  assessmentRegistry = {},
  children,
  layout = "root"
}) {
  const sections = schema.sections || [
    { title: null, fields: schema.fields }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div
          style={
            layout === "root"
              ? styles.card
              : styles.nestedContainer
          }
        >


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
                <div
                  key={sIdx}
                  style={
                    layout === "root"
                      ? styles.sectionCard
                      : styles.nestedSection
                  }
                >


                  {section.title && (
                    <div style={styles.sectionTitle}>
                      {section.title}
                    </div>
                  )}
                  {/* ===== MATRIX HEADER ===== */}
                  {section.fields && section.fields.some(f => f.type === "radio-matrix" && !f.hideMatrixHeader) && (
                    <div style={styles.matrixHeader}>
                      <div style={styles.matrixLabel}>
                        Scale
                        {/* {(() => {
        const matrix = section.fields.find(f => f.type === "radio-matrix");
        if (!matrix?.info) return null;

        return (
          <InfoTooltip info={matrix.info} />
        );
      })()} */}
                      </div>

                      <div style={styles.matrixOptions}>
                        {section.fields
                          .find(f => f.type === "radio-matrix")
                          .options.map(opt => (
                            <div key={opt.value} style={styles.matrixHeaderCell}>
                              {opt.label}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}



                  {section.fields && section.fields.map(field => {

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
                      <div
                        key={field.name}
                        style={{
                          ...styles.field,
                          marginBottom: layout === "nested" ? 10 : 18
                        }}
                      >


                        {/* RADIO stays special (side layout) */}
                        {field.type === "radio" && !field.inRow ? (
                          <div style={styles.radioRow}>
                            <div style={styles.radioLabel}>{field.label}</div>
                            {renderField(
                              field,
                              value,
                              values,
                              onChange,
                              onAction,
                              assessmentRegistry
                            )}                          </div>
                        ) : field.type === "subheading" ? (

                          renderField(field)
                        ) : (
                          <div style={{ marginBottom: 16 }}>

                            <>
                              {!["button", "subheading", "radio-matrix", "score-box", "inline-input", "grid-row"].includes(field.type)
                                && field.type !== "checkbox-group"
                                && (
                                  <label style={styles.label}>
                                    {field.label}
                                  </label>
                                )}


                              {renderField(
                                field,
                                value,
                                values,
                                onChange,
                                onAction,
                                assessmentRegistry
                              )}
                            </>

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
function InfoTooltip({ info }) {
  const [open, setOpen] = React.useState(false);

  if (!info) return null;

  const content = typeof info === "string" ? [info] : info.content;

  return (
    <span
      style={styles.infoWrapper}
      onClick={e => {
        e.stopPropagation();       // ✅ prevent parent clicks
        setOpen(o => !o);
      }}
    >
      ⓘ
      {open && (
        <div style={styles.tooltip}>
          {info.title && (
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {info.title}
            </div>
          )}
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {content.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </span>
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

function FileUploadModal({ field, value, onChange }) {
  const [showModal, setShowModal] = React.useState(false);
  const inputRef = React.useRef();

  const handleFile = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(field.name, {
        filename: file.name,
        size: file.size,
        type: file.type,
        data: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div style={{ width: "100%", maxWidth: 320 }}>
        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="file"
          accept={field.accept || "image/*,.pdf"}
          onChange={e => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />

        {/* Upload box */}
        {!value?.data && (
          <div
            onClick={() => inputRef.current?.click()}
            style={{
              border: "1px dashed #cbd5e1",
              borderRadius: 8,
              padding: "10px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f8fafc"
            }}
          >
            <span style={{ fontSize: 12, color: "#475569" }}>
              Upload file
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 4,
                background: "#e2e8f0",
                color: "#334155",
                fontWeight: 500
              }}
            >
              Choose
            </span>
          </div>
        )}

        {/* Selected file pill */}
        {value?.data && (
          <div
            style={{
              marginTop: 6,
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#fff"
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "#1f2937",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {value.filename}
            </span>

            <button
              onClick={() => setShowModal(true)}
              title="View"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#2563eb",
                fontSize: 14
              }}
            >
              👁️
            </button>

            <button
              onClick={() => onChange(field.name, null)}
              title="Remove"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#ef4444",
                fontSize: 14
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 24,
              maxWidth: "85%",
              maxHeight: "85%",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{value?.filename}</strong>
              <button
                onClick={() => setShowModal(false)}
                style={{ border: "none", background: "none", fontSize: 20 }}
              >
                ✕
              </button>
            </div>

            <img
              src={value?.data}
              alt=""
              style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function AssessmentLauncher({
  field,
  values,
  onChange,
  assessmentRegistry
}) {
  const activeKey = `${field.name}_active`;
  const active = values[activeKey] || null;
  const ActiveComponent = active
    ? assessmentRegistry?.[active]
    : null;

  return (
    <div>
      <div style={styles.inlineGroup}>
        {field.options.map(opt => (
          <button
            key={opt.value}
            style={{
              ...styles.btnOutline,
              background: active === opt.value ? "#2563EB" : "#fff",
              color: active === opt.value ? "#fff" : "#111827"
            }}
            onClick={() =>
              onChange(
                activeKey,
                active === opt.value ? null : opt.value
              )
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {ActiveComponent ? (
        <div style={{ marginTop: 20, width: '100%' }}>
          <ActiveComponent values={values} onChange={onChange}  layout="nested" />
        </div>
      ) : null}
    </div>
  );
}

function RadioMatrixRow({ field, value, onChange }) {
  return (
    <div style={styles.matrixRow}>
      <div style={styles.matrixLabel}>
        {field.label}
        {field.info && <InfoTooltip info={field.info} />}
      </div>



      <div style={styles.matrixOptions}>
        {field.options.map(opt => (
          <label key={opt.value} style={styles.matrixCell}>
            <input
              type="radio"
              name={field.name}
              checked={value === opt.value}
              onChange={() => onChange(field.name, opt.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}


function renderField(
  field,
  value,
  values,
  onChange,
  onAction,
  assessmentRegistry
) {

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

    case "grid-table-flat":
      return (
        <div style={styles.tableWrap}>
          {/* Header row */}
          <div style={styles.tableHeaderFlat}>
            <div></div>
            {field.headers.map(h => (
              <div key={h} style={styles.tableHeaderCell}>{h}</div>
            ))}
          </div>

          {/* Data rows */}
          {field.rows.map(row => (
            <div key={row.key} style={styles.tableRowFlat}>
              <div style={styles.tableRowLabel}>{row.label}</div>

              {field.headers.map(h => (
                <input
                  key={`${row.key}_${h}`}
                  style={styles.tableInput}
                  value={values[`${field.name}_${row.key}_${h}`] || ""}
                  onChange={e =>
                    onChange(`${field.name}_${row.key}_${h}`, e.target.value)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      );



    case "scale-table":
      return (

        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "45%" }} />
            {field.columns.map((_, i) => (
              <col key={i} style={{ width: `${55 / field.columns.length}%` }} />
            ))}
          </colgroup>

          <thead>
            <tr>
              <th style={styles.th}></th>
              {field.columns.map(col => (
                <th key={col.value} style={styles.th}>
                  {col.label}
                  {!col?.required && (
                    <div style={{ fontSize: 11, fontWeight: 600 }}>({col.value})</div>
                  )}

                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {field.rows.map((rowLabel, rIdx) => {
              const rowKey = `${field.name}_${rIdx}`;
              return (
                <tr key={rowKey}>
                  <td style={styles.tdLabel}>{rowLabel}</td>
                  {field.columns.map(col => (
                    <td key={col.value} style={styles.td}>
                      <input
                        type="radio"
                        name={rowKey}
                        checked={values[rowKey] === col.value}
                        onChange={() => onChange(rowKey, col.value)}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>


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
      // If this row is only buttons, pack them tightly like a toolbar (no big gaps)
      // Otherwise, keep a responsive grid for typical form fields.
      const rowAllButtons = (field.fields || []).every(f => f?.type === "button");
      return (
        <div
          style={{
            ...(rowAllButtons
              ? {
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
                justifyContent: "flex-start"
              }
              : {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16
              })
          }}
        >
          {field.fields.map(f => {
            // Check showIf visibility condition
            if (f.showIf) {
              const depVal = values[f.showIf.field];

              if ("equals" in f.showIf && depVal !== f.showIf.equals) {
                return null;
              }

              if ("exists" in f.showIf && !depVal) {
                return null;
              }

              if ("includes" in f.showIf) {
                if (!Array.isArray(depVal) || !depVal.includes(f.showIf.includes)) {
                  return null;
                }
              }
            }

            const v = values[f.name];
            return (
              <div key={f.name} style={rowAllButtons ? { flex: "0 0 auto" } : undefined}>
                {f.label && f.type !== "button" && (
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      marginBottom: 6
                    }}
                  >
                    {f.label}
                  </label>
                )}

                {/* ✅ Pass correct arguments */}
                {renderField(
                  f,
                  v,
                  values,
                  onChange,
                  onAction,
                  assessmentRegistry
                )}
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

    case "score-box":
      return (
        <div style={styles.scoreBox}>
          <div style={styles.scoreLabel}>
            {field.label}
          </div>
          <div style={styles.scoreValue}>
            {value ?? 0}
          </div>
        </div>
      );

    case "grid-header": {
      const colsCount = field.cols.length;
      const template = `180px repeat(${colsCount}, 1fr)`;

      return (
        <div style={{ ...styles.gridHeaderRow, gridTemplateColumns: template }}>
          <div></div>
          {field.cols.map(col => (
            <div key={col} style={styles.gridHeaderCell}>
              {col}
            </div>
          ))}
        </div>
      );
    }
    case "custom-image":
      return (
        <div>
          {/* <div style={styles.label}>{field.label}</div> */}
          <img
            src={field.src}
            alt={field.label}
            style={{
              width: "100%",
              maxWidth: 600,
              height: "auto",
              maxHeight: 300,
              objectFit: "contain",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              marginTop: 8
            }}
          />
        </div>
      );


    case "grid-row": {
      const colsCount = field.cols.length;
      const template = `180px repeat(${colsCount}, 1fr)`;

      return (
        <div style={{ ...styles.gridRow, gridTemplateColumns: template }}>
          <div style={styles.gridLabel}>{field.label}</div>
          {field.cols.map((col, idx) => {
            const fieldKey = `${field.name}_${idx}`;

            // Handle object column type (e.g., single-select with options)
            if (typeof col === "object" && col.type === "single-select") {
              return (
                <select
                  key={fieldKey}
                  style={styles.gridInput}
                  value={values[fieldKey] || ""}
                  onChange={e => onChange(fieldKey, e.target.value)}
                >
                  <option value="">Select</option>
                  {col.options.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            }

            // Handle file-upload-modal type
            if (typeof col === "object" && col.type === "file-upload-modal") {
              return (
                <div key={fieldKey} style={styles.gridInput}>
                  {renderField(
                    { ...col, name: col.name },
                    values[col.name],
                    values,
                    onChange,
                    onAction,
                    assessmentRegistry
                  )}
                </div>
              );
            }

            // Handle string column type (e.g., "textarea", "input")
            return (
              <input
                key={fieldKey}
                style={styles.gridInput}
                value={values[fieldKey] || ""}
                onChange={e => onChange(fieldKey, e.target.value)}
              />
            );
          })}
        </div>
      );
    }


    case "nested":
      return (
        <CommonFormBuilder
          schema={{
            title: field.title,
            fields: field.fields
          }}
          values={values}
          onChange={onChange}
          onAction={onAction}
          assessmentRegistry={assessmentRegistry}
          layout="nested"
        />
      );

    case "paired-select":
      return (
        <div style={styles.pairedBlock}>
          {/* ROW 1: TITLES */}
          <div style={styles.pairedTitles}>
            <div style={styles.pairedTitleCell}>
              {field.right.title}
            </div>
            <div style={styles.pairedTitleCell}>
              {field.left.title}
            </div>
          </div>

          {/* ROW 2: DROPDOWNS */}
          <div style={styles.pairedInputs}>
            <select
              style={styles.select}
              value={values[field.right.name] || ""}
              onChange={e =>
                onChange(field.right.name, e.target.value)
              }
            >
              <option value="">Select</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              style={styles.select}
              value={values[field.left.name] || ""}
              onChange={e =>
                onChange(field.left.name, e.target.value)
              }
            >
              <option value="">Select</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );


    case "radio-matrix":
      return (
        <RadioMatrixRow
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <textarea
          style={styles.textarea}
          value={value || ""}
          readOnly={field.readOnly}
          onChange={e =>
            !field.readOnly && onChange(field.name, e.target.value)
          }
        />
      );
    case "date":
      return (
        <input
          type="date"
          style={styles.input}
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
    case "radio-matrix":
      return (
        <RadioMatrixRow
          field={field}
          value={value}
          onChange={onChange}
        />
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
    case "attach-file":
      return (
        <div style={styles.field}>
          <label style={styles.label}>
            {field.title}
            {field.required && <span style={{ color: "red" }}> *</span>}
          </label>


          <div style={styles.inlineGroup}>
            <input
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              onChange={e => {
                const files = field.multiple
                  ? Array.from(e.target.files || [])
                  : e.target.files?.[0] || null;

                onChange(field.name, files);
              }}
              style={styles.fileInput}
            />

            {/* Preview / filename */}
            {value && !Array.isArray(value) && (
              <FilePreview file={value} />
            )}

            {Array.isArray(value) &&
              value.map((file, idx) => (
                <FilePreview key={idx} file={file} />
              ))}
          </div>
        </div>
      );


    case "paired-text":
      const pairs = field.pairs || [];

      return (
        <div style={styles.field}>
          <label style={styles.label}>{field.label}</label>

          <div style={{ display: "flex", gap: 12 }}>
            {pairs.map(pair => (
              <div key={pair.name} style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", }}>
                  {pair.title || pair.label}
                </div>

                <input
                  type="text"
                  value={value?.[pair.name] || ""}
                  onChange={e =>
                    onChange(field.name, {
                      ...(value || {}),
                      [pair.name]: e.target.value
                    })
                  }
                  style={styles.input}
                />
              </div>
            ))}
          </div>
        </div>
      );




    case "assessment-launcher":
      return (
        <AssessmentLauncher
          field={field}
          values={values}                 // ✅ FIX
          onChange={onChange}
          assessmentRegistry={assessmentRegistry} // ✅ FIX
        />
      );


    case "checkbox-group":
      const inline = field.inlineWithLabel;

      if (inline) {
        return (
          <div
            style={{
              display: "flex",
              gridTemplateColumns: "220px 1fr",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {/* LABEL */}
            <div style={styles.label}>
              {field.label}
            </div>

            {/* OPTIONS */}
            <div
              style={{
                display: "flex",
                gap: 28,
                flexWrap: "wrap"
              }}
            >
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
          </div>
        );
      }

      /* DEFAULT BEHAVIOUR (unchanged) */
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

    case "file-upload":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="file"
            accept={field.accept || "image/*,.pdf"}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(field.name, {
                  filename: file.name,
                  size: file.size,
                  type: file.type,
                  lastModified: file.lastModified
                });
              }
            }}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              cursor: "pointer"
            }}
          />
          {value?.filename && (
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              ✓ {value.filename}
            </span>
          )}
        </div>
      );

    case "file-upload-modal":
      return (
        <FileUploadModal
          field={field}
          value={value}
          onChange={onChange}
        />
      );

    case "refraction-table": {
      const rows = field.rows || [];
      const eyeColumns = field.columns || ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"];
      const extraColumns = field.extraColumns || [];

      return (
        <div style={styles.refractionTableWrapper}>
          {/* Header Row 1: Eye labels */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Right Eye</div>
            </div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Left Eye</div>
            </div>
            {extraColumns.length > 0 && (
              <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${extraColumns.length}, 1fr)` }}>
                {extraColumns.map(col => (
                  <div key={col} style={styles.refractionTableEyeLabel}>{col}</div>
                ))}
              </div>
            )}
          </div>

          {/* Header Row 2: Column labels */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            {[0, 1].map(eye => (
              <div key={eye} style={styles.refractionTableHeaderGroup}>
                {eyeColumns.map(col => (
                  <div key={col} style={styles.refractionTableColumnHeader}>
                    {col}
                  </div>
                ))}
              </div>
            ))}
            {extraColumns.length > 0 && (
              <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${extraColumns.length}, 1fr)` }}>
                {extraColumns.map(col => (
                  <div key={col} style={styles.refractionTableColumnHeader}>
                    {col}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={styles.refractionTableRow}>
              <div style={styles.refractionTableRowLabel}>{row.label}</div>
              {[0, 1].map(eye => (
                <div key={`${rowIdx}-eye-${eye}`} style={styles.refractionTableHeaderGroup}>
                  {eyeColumns.map((col, colIdx) => {
                    const fieldName = `${field.name}_${row.value}_${eye === 0 ? "re" : "le"}_${colIdx}`;
                    const fieldValue = values[fieldName] || "";
                    return (
                      <input
                        key={fieldName}
                        style={styles.refractionTableInput}
                        value={fieldValue}
                        onChange={e => onChange(fieldName, e.target.value)}
                        placeholder=""
                      />
                    );
                  })}
                </div>
              ))}
              {extraColumns.length > 0 && (
                <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${extraColumns.length}, 1fr)` }}>
                  {extraColumns.map((col, colIdx) => {
                    const fieldName = `${field.name}_${row.value}_extra_${colIdx}`;
                    const fieldValue = values[fieldName] || "";
                    return (
                      <input
                        key={fieldName}
                        style={styles.refractionTableInput}
                        value={fieldValue}
                        onChange={e => onChange(fieldName, e.target.value)}
                        placeholder=""
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }


    case "refraction-table-full": {
      const rows = field.rows || [];
      const eyeColumns = field.columns || ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"];

      return (
        <div style={styles.refractionTableWrapper}>
          {/* Header Row 1: Eye labels */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Right Eye</div>
            </div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Left Eye</div>
            </div>
          </div>

          {/* Header Row 2: Column labels */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            {[0, 1].map(eye => (
              <div key={eye} style={styles.refractionTableHeaderGroup}>
                {eyeColumns.map(col => (
                  <div key={col} style={styles.refractionTableColumnHeader}>
                    {col}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={styles.refractionTableRow}>
              <div style={styles.refractionTableRowLabel}>{row.label}</div>
              {[0, 1].map(eye => (
                <div key={`${rowIdx}-eye-${eye}`} style={styles.refractionTableHeaderGroup}>
                  {eyeColumns.map((col, colIdx) => {
                    const fieldName = `${field.name}_${row.value}_${eye === 0 ? "re" : "le"}_${colIdx}`;
                    const fieldValue = values[fieldName] || "";
                    return (
                      <input
                        key={fieldName}
                        style={styles.refractionTableInput}
                        value={fieldValue}
                        onChange={e => onChange(fieldName, e.target.value)}
                        placeholder=""
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }


    case "refraction-12col": {
      const rows = field.rows || [];
      const groups = field.groups || [];

      // flatten all columns
      const flatCols = groups.flatMap(g => g.columns);

      return (
        <div style={styles.refraction12Wrapper}>
          {/* Header Row 1 – Group Labels */}
          <div style={styles.refraction12Row}>
            <div style={styles.refraction12LabelCell}></div>

            {groups.map((g, i) => (
              <div
                key={i}
                style={{
                  ...styles.refraction12GroupHeader,
                  gridColumn: `span ${g.columns.length}`
                }}
              >
                {g.label}
              </div>
            ))}
          </div>

          {/* Header Row 2 – Column Labels */}
          <div style={styles.refraction12Row}>
            <div style={styles.refraction12LabelCell}></div>
            {flatCols.map((c, i) => (
              <div key={i} style={styles.refraction12ColHeader}>
                {c}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map(r => (
            <div key={r.value} style={styles.refraction12Row}>
              <div style={styles.refraction12RowLabel}>{r.label}</div>

              {flatCols.map((_, i) => {
                const key = `${field.name}_${r.value}_${i}`;
                return (
                  <input
                    key={key}
                    style={styles.refraction12Input}
                    value={values[key] || ""}
                    onChange={e => onChange(key, e.target.value)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      );
    }

    case "final-prescription-table": {
      const rows = field.rows || [];
      const eyeColumns = field.columns || ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"];
      const pupilColumns = field.pupilColumns || ["Distance", "Height"];

      return (
        <div style={styles.refractionTableWrapper}>
          {/* Header Row 1: Eye labels and Pupil label */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Right Eye</div>
            </div>
            <div style={styles.refractionTableHeaderGroup}>
              <div style={styles.refractionTableEyeLabel}>Left Eye</div>
            </div>
            <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${pupilColumns.length}, 1fr)` }}>
              <div style={styles.refractionTableEyeLabel}>Pupil</div>
            </div>
          </div>

          {/* Header Row 2: Column labels */}
          <div style={styles.refractionTableRow}>
            <div style={styles.refractionTableCell}></div>
            {[0, 1].map(eye => (
              <div key={eye} style={styles.refractionTableHeaderGroup}>
                {eyeColumns.map(col => (
                  <div key={col} style={styles.refractionTableColumnHeader}>
                    {col}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${pupilColumns.length}, 1fr)` }}>
              {pupilColumns.map(col => (
                <div key={col} style={styles.refractionTableColumnHeader}>
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} style={styles.refractionTableRow}>
              <div style={styles.refractionTableRowLabel}>{row.label}</div>
              {[0, 1].map(eye => (
                <div key={eye} style={styles.refractionTableHeaderGroup}>
                  {eyeColumns.map((col, colIdx) => {
                    const fieldName = `${field.name}_${row.value}_${eye === 0 ? "re" : "le"}_${colIdx}`;
                    const fieldValue = values[fieldName] || "";
                    return (
                      <input
                        key={colIdx}
                        style={styles.refractionTableInput}
                        value={fieldValue}
                        onChange={e => onChange(fieldName, e.target.value)}
                        placeholder=""
                      />
                    );
                  })}
                </div>
              ))}
              <div style={{ ...styles.refractionTableHeaderGroup, gridTemplateColumns: `repeat(${pupilColumns.length}, 1fr)` }}>
                {pupilColumns.map((col, colIdx) => {
                  const fieldName = `${field.name}_${row.value}_pupil_${colIdx}`;
                  const fieldValue = values[fieldName] || "";
                  return (
                    <input
                      key={colIdx}
                      style={styles.refractionTableInput}
                      value={fieldValue}
                      onChange={e => onChange(fieldName, e.target.value)}
                      placeholder=""
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}

function FilePreview({ file }) {
  const isImage = file.type.startsWith("image/");

  return (
    <div style={{ marginTop: 6 }}>
      {isImage ? (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{
            maxWidth: 160,
            maxHeight: 120,
            borderRadius: 6,
            border: "1px solid #ddd"
          }}
        />
      ) : (
        <div style={{ fontSize: 13, color: "#2563eb" }}>
          📄 {file.name}
        </div>
      )}
    </div>
  );
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
    minHeight: "auto",
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
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,23,42,0.04)"
  },
  gridHeaderRow: {
    display: "grid",
    alignItems: "center",
    marginBottom: 8,
    columnGap: 12,
    paddingBottom: 12,
    fontWeight: 700,
    fontSize: 13,
    color: "#0F172A"
  },

  gridRow: {
    display: "grid",
    alignItems: "center",
    marginBottom: 12,
    columnGap: 12,
    paddingBottom: 8,
    borderBottom: "1px solid #f0f0f0"
  },

  refraction12Wrapper: {
    border: "1px solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8
  },

  refraction12Row: {
    display: "grid",
    gridTemplateColumns: "120px repeat(12, 1fr)",
    borderBottom: "1px solid #e5e7eb"
  },

  refraction12LabelCell: {
    background: "#f9fafb",
    borderRight: "1px solid #e5e7eb"
  },

  refraction12GroupHeader: {
    gridColumn: "span 1",
    textAlign: "center",
    padding: "10px 6px",
    fontWeight: 700,
    background: "#f3f4f6",
    borderRight: "1px solid #e5e7eb"
  },

  refraction12ColHeader: {
    textAlign: "center",
    padding: "8px 4px",
    fontWeight: 600,
    background: "#f3f4f6",
    borderRight: "1px solid #e5e7eb",
    fontSize: 13
  },

  refraction12RowLabel: {
    padding: "10px",
    fontWeight: 600,
    background: "#f9fafb",
    borderRight: "1px solid #e5e7eb"
  },

  refraction12Input: {
    width: "100%",
    border: "none",
    padding: "8px 4px",
    textAlign: "center",
    borderRight: "1px solid #e5e7eb",
    boxSizing: "border-box"
  },
  gridHeaderCell: {
    textAlign: "center",
    fontWeight: 700,
    color: "#0F172A",
    fontSize: 13
  },

  gridLabel: {
    fontWeight: 600,
    color: "#0F172A",
    fontSize: 14
  },

  gridInput: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "inherit",
    lineHeight: "1.5"
  },


  tableWrap: { marginTop: 10 },

  tableHeaderFlat: {
    display: "grid",
    gridTemplateColumns: "120px repeat(10, 1fr)",
    fontWeight: 600,
    fontSize: 12,
    marginBottom: 6
  },

  tableRowFlat: {
    display: "grid",
    gridTemplateColumns: "120px repeat(10, 1fr)",
    gap: 6,
    marginBottom: 6,
    alignItems: "center"
  },

  tableHeaderCell: {
    textAlign: "center"
  },

  tableRowLabel: {
    fontWeight: 500
  },

  tableInput: {
    padding: "6px",
    border: "1px solid #d1d5db",
    borderRadius: 4,
    textAlign: "center"
  },


  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb"
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827"
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4
  },

  actions: {
    display: "flex",
    gap: 8
  },
  scoreBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 8,
    margin: "20px 0px 5px 0px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontWeight: 600,
    fontSize: 14
  },

  scoreLabel: {
    color: "#0F172A"
  },

  th: {
    border: "1px solid #CBD5E1",
    padding: "10px 6px",
    fontSize: 13,
    textAlign: "center",
    background: "#F1F5F9",
    color: "#0F172A",
    fontWeight: 700,
    lineHeight: 1.2
  },

  tdLabel: {
    border: "1px solid #CBD5E1",
    padding: 10,
    fontWeight: 600,
    width: "40%"
  },

  td: {
    border: "1px solid #CBD5E1",
    textAlign: "center",
    padding: 8
  },

  scoreValue: {
    minWidth: 48,
    textAlign: "right",
    fontSize: 16,
    fontWeight: 700,
    color: "#111827"
  },

  mstBtn: {
    background: "#fff",
    border: "1.5px solid #111827",
    color: "#0f172A",
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
    padding: 18,
    marginBottom: 20,
    background: "#fafafa"
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    color: "#111827",
    paddingBottom: 8,
    borderBottom: "2px solid #e5e7eb"
  },

  field: {
    marginBottom: 18
  },

  label: {
    fontWeight: 600,
    marginBottom: 8,
    display: "block",
    color: "#0F172A",
    fontSize: 14
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    fontFamily: "inherit"
  },

  textarea: {
    width: "100%",
    minHeight: 100,
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    fontFamily: "inherit",
    resize: "vertical"
  },

  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    fontFamily: "inherit",
    lineHeight: "1.5"
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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", 
  gap: 24
},

  radioLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: "#0F172A"
  },
  subheading: {
    marginTop: 24,
    marginBottom: 14,
    fontWeight: 700,
    fontSize: 15,
    color: "#0F172A",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: 8
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
    background: "#fff",
    fontSize: 14
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
  matrixHeader: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    marginBottom: 12,
    borderBottom: "2px solid #d1d5db",
    fontSize: 14,
    fontWeight: 600,
    paddingBottom: 12,
    color: "#0F172A"
  },

  matrixHeaderCell: {
    width: 110,
    textAlign: "center",
    padding: "0 8px"
  },
  nestedContainer: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px",
    width: "100%",
    background: " #fff"
  },
  nestedSection: {
    border: "none",
    padding: 0,
    marginBottom: 8
  },
  pairedBlock: {
    display: "grid",
    gap: 6
  },

  pairedTitles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    fontSize: 13,
    fontWeight: 600,
    color: "#0F172A"
  },

  pairedTitleCell: {
    textAlign: "left"
  },

  pairedInputs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
  },

  matrixRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: "1px solid #f0f0f0"
  },

  matrixLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: "#0F172A",
    display: "flex",
    alignItems: "center",
    gap: 8
  },

  matrixOptions: {
    display: "flex",
    gap: 16,
    justifyContent: "center"
  },

  matrixCell: {
    width: 110,
    display: "flex",
    justifyContent: "center",
    padding: "8px"
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
  fileInput: {
    fontSize: 14,
    padding: "6px 0"
  },
  btnOutline: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1.5px solid #111827",
    background: "#fff",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    color: "#0F172A",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minWidth: 140,
    lineHeight: 1.3,
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
  },
  pairedRow: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: 24,
    alignItems: "flex-start",
    marginBottom: 12
  },

  pairedLabel: {
    fontWeight: 600,
    color: "#0F172A",
    fontSize: 14,
    paddingTop: 2
  },

  pairedControls: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
  },

  pairedSide: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },

  sideLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#6b7280"
  },

  footer: {
    marginTop: 20
  },
  infoWrapper: {
    position: "relative",
    marginLeft: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  tooltip: {

    position: "absolute",
    top: "100%",
    left: 0,
    background: "#222",
    color: "#fff",
    padding: "8px 10px",
    borderRadius: 4,
    fontSize: 12,
    width: 220,
    zIndex: 100
  },

  infoWrapperHover: {
    display: "block"
  },

  refractionTableWrapper: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8
  },

  refractionTableRow: {
    display: "grid",
    gridTemplateColumns: "120px repeat(2, 1fr)",
    borderBottom: "1px solid #e5e7eb"
  },

  refractionTableCell: {
    padding: "12px",
    borderRight: "1px solid #e5e7eb",
    fontWeight: 600,
    backgroundColor: "#f9fafb"
  },

  refractionTableRowLabel: {
    padding: "12px",
    borderRight: "1px solid #e5e7eb",
    fontWeight: 600,
    color: "#0F172A",
    fontSize: 14,
    backgroundColor: "#f9fafb"
  },

  refractionTableHeaderGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    borderRight: "1px solid #e5e7eb"
  },

  refractionTableEyeLabel: {
    gridColumn: "1 / -1",
    padding: "10px 12px",
    fontWeight: 700,
    textAlign: "center",
    color: "#0F172A",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #d1d5db",
    fontSize: 14
  },

  refractionTableColumnHeader: {
    padding: "10px 6px",
    fontWeight: 700,
    textAlign: "center",
    color: "#0F172A",
    backgroundColor: "#f3f4f6",
    fontSize: 13,
    borderRight: "1px solid #e5e7eb"
  },

  refractionTableInput: {
    width: "100%",
    padding: "8px 4px",
    border: "none",
    textAlign: "center",
    fontSize: 13,
    borderRight: "1px solid #e5e7eb",
    boxSizing: "border-box"
  },

  fundusTableWrapper: {
    border: "1px solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8
  },

  fundusTableRow: {
    display: "grid",
    gridTemplateColumns: "150px 1fr 1fr",
    borderBottom: "1px solid #e5e7eb",
    alignItems: "center"
  },

  fundusTableRowLabel: {
    padding: "12px",
    fontWeight: 600,
    color: "#0F172A",
    fontSize: 14,
    backgroundColor: "#f9fafb",
    borderRight: "1px solid #e5e7eb",
    textAlign: "left"
  },

  fundusTableColumn: {
    padding: "12px",
    borderRight: "1px solid #e5e7eb"
  }
};
