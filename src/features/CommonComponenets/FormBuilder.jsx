import React, { useEffect } from "react";
import AnatomyImageOverlayInputs from "./AnatomyImageSelector";

function evaluateShowIf(showIf, values) {
  if (!showIf) return true;
  if ("and" in showIf) {
    const rest = { ...showIf };
    delete rest.and;
    return evaluateShowIf(rest, values) && evaluateShowIf(showIf.and, values);
  }
  if ("or" in showIf) {
    const conditions = Array.isArray(showIf.or) ? showIf.or : [showIf.or];
    return conditions.some(cond => {
      const depVal = values[cond.field];
      if ("equals" in cond && depVal !== cond.equals) return false;
      if ("oneOf" in cond) {
        const allowed = Array.isArray(cond.oneOf) ? cond.oneOf : [cond.oneOf];
        if (!allowed.includes(depVal)) return false;
      }
      if ("includes" in cond) {
        if (!Array.isArray(depVal) || !depVal.includes(cond.includes)) return false;
      }
      if ("exists" in cond && !depVal) return false;
      return true;
    });
  }
  const depVal = values[showIf.field];
  if ("equals" in showIf) {
    if (Array.isArray(depVal)) return depVal.includes(showIf.equals);
    return depVal === showIf.equals;
  }
  if ("oneOf" in showIf) {
    const allowed = Array.isArray(showIf.oneOf) ? showIf.oneOf : [showIf.oneOf];
    if (Array.isArray(depVal)) return depVal.some(v => allowed.includes(v));
    return allowed.includes(depVal);
  }
  if ("includes" in showIf) return Array.isArray(depVal) && depVal.includes(showIf.includes);
  if ("exists" in showIf) return !!depVal;
  return true;
}

export default function CommonFormBuilder({
  schema,
  values,
  onChange,
  submitted,
  onAction,
  assessmentRegistry = {},
  children,
  layout = "root",
  language,
  readOnly: formReadOnly = false,
  showScores
}) {
  const sections = schema.sections || [
    { title: null, fields: schema.fields }
  ];
  const supportsLanguage = schema?.enableLanguageToggle;

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
              <div style={styles.title}>
                {t(schema.title, schema?.enableLanguageToggle ? (language || "en") : "en")}
              </div>
              {schema.subtitle && (
  <div style={styles.subtitle}>
    {t(schema.subtitle, schema?.enableLanguageToggle ? (language || "en") : "en")}
  </div>
)}

            </div>

     {schema.actions?.length > 0 && (
  <div style={styles.actionsBar}>
    
    {/* LEFT: Special controls (toggles, switches) */}
    <div style={styles.actionControls}>
      {schema.actions.map(action => {
        if (
          action.type === "toggle-language" &&
          schema.enableLanguageToggle
        ) {
          return (
            <MalayToggle
              key={action.type}
              enabled={language === "ms"}
              onToggle={() => onAction?.("toggle-language")}
            />
          );
        }
        if (
          action.type === "toggle-show-scores" &&
          schema.enableScoreToggle
        ) {
          return (
            <ScoresToggle
              key={action.type}
              enabled={showScores}
              onToggle={() => onAction?.("toggle-show-scores")}
            />
          );
        }
        return null;
      })}
    </div>

    {/* RIGHT: Normal buttons (Save, Clear, Back, etc.) */}
    <div style={styles.actionButtons}>
      {schema.actions
        .filter(a => a.type !== "toggle-language" && a.type !== "toggle-show-scores")
        .filter(a => !formReadOnly || a.type === "back")
        .map(action => (
          <button
            key={action.type}
            style={styles.mstBtn}
            onClick={() => onAction?.(action.type)}
          >
            {t(action.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
          </button>
        ))}
    </div>

              </div>
            )}

          </div>

          <div style={styles.body}>
            {sections.map((section, sIdx) => {

              /* ===== SECTION-LEVEL VISIBILITY ===== */
              if (section.showIf && !evaluateShowIf(section.showIf, values)) return null;

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
                      {t(section.title, supportsLanguage ? (language || "en") : "en")}
                    </div>
                  )}

                  {(() => {
                    const firstMatrixField = section.fields.find(f => f.type === "radio-matrix");
                    // Check if there's a grid-header before the first radio-matrix
                    const hasGridHeader = section.fields.some((f, idx) => {
                      const matrixIdx = section.fields.findIndex(f2 => f2.type === "radio-matrix");
                      return f.type === "grid-header" && matrixIdx !== -1 && idx < matrixIdx;
                    });
 const matrixColumnWidth = firstMatrixField?.options?.length
                      ? Math.max(36, Math.max(...firstMatrixField.options.map(o => String(o?.label || "").length)) * 10 + 16)
                      : 110;
                    const getPrevVisibleField = (idx) => {
                      for (let i = idx - 1; i >= 0; i--) {
                        const f = section.fields[i];
                        if (f.showIf && !evaluateShowIf(f.showIf, values)) continue;
                        return { field: f, idx: i };
                      }
                      return null;
                    };
                    const optionsEqual = (a, b) => {
                      if (!a || !b || a.length !== b.length) return false;
                      return a.every((o, i) => (o?.value ?? o) === (b[i]?.value ?? b[i]) && (o?.label ?? o) === (b[i]?.label ?? b[i]));
                    };
                    const renderScaleBeforeSubheading = (field, idx) => {
                      if (field.type !== "subheading" || hasGridHeader) return null;
                      const nextMatrix = section.fields[idx + 1];
                      if (nextMatrix?.type !== "radio-matrix" || !nextMatrix?.options?.length) return null;
                      const questionColumnWidth = 200; // Fixed width for question column
                      const optionsCount = nextMatrix.options?.length || 4;
                      const headerStyle = {
                        ...styles.matrixHeader,
                        marginBottom: 12,
                        gridTemplateColumns: `${questionColumnWidth}px repeat(${optionsCount}, 1fr)`
                      };
                      return (
                        <div key={`scale-${idx}`} style={headerStyle}>
                          <div style={styles.matrixLabel}>
                            {nextMatrix.matrixHeaderLabel || "Scale"}
                            {nextMatrix.info && (showScores !== false) && <InfoTooltip info={nextMatrix.info} />}
                          </div>
                          <div style={styles.matrixOptions}>
                            {nextMatrix.options?.map((opt) => (
                              <div key={opt.value} style={styles.matrixHeaderCell}>
                                {t(opt.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    };
                    const shouldShowScaleBeforeMatrix = (field, idx) => {
                      if (field.type !== "radio-matrix" || !field.options?.length || hasGridHeader) return false;
                      const prev = getPrevVisibleField(idx);
                      const scaleAlreadyBeforeSubheading = prev?.field?.type === "subheading" && section.fields[prev.idx + 1]?.type === "radio-matrix";
                      if (scaleAlreadyBeforeSubheading) return false;
                      const prevMatrix = prev?.field?.type === "radio-matrix" ? prev.field : null;
                      return !prevMatrix || !optionsEqual(prevMatrix.options, field.options);
                    };
                    return (
                      <>
                        {section.fields.map((field, idx) => {

                      if (field.showIf && !evaluateShowIf(field.showIf, values)) return null;

                      const value = values[field.name];
                      const error = submitted
                        ? validateField(value, field.validation)
                        : null;

                      const fieldKey = field.name ?? (typeof field.label === "string" ? field.label : null) ?? `field-${idx}`;
                      return (
                        <React.Fragment key={fieldKey}>
                          {renderScaleBeforeSubheading(field, idx)}
                          {shouldShowScaleBeforeMatrix(field, idx) && (() => {
                            const questionColumnWidth = 200; // Fixed width for question column
                            const optionsCount = field.options?.length || 4;
                            const headerStyle = {
                              ...styles.matrixHeader,
                              marginBottom: 12,
                              gridTemplateColumns: `${questionColumnWidth}px repeat(${optionsCount}, 1fr)`
                            };
                            return (
                              <div style={headerStyle}>
                                <div style={styles.matrixLabel}>
                                  {field.matrixHeaderLabel || "Scale"}
                                  {field.info && (showScores !== false) && <InfoTooltip info={field.info} />}
                                </div>
                                <div style={styles.matrixOptions}>
                                  {field.options?.map((opt) => (
                                    <div key={opt.value} style={styles.matrixHeaderCell}>
                                      {t(opt.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}
                          <div
                            style={{
                              ...styles.field,
                              marginBottom: layout === "nested" ? 10 : 18
                            }}
                          >


                            {/* RADIO stays special (side layout) */}
{/* RADIO: labelAbove = label on one line, options on next line */}
{field.type === "radio" && !field.inRow && field.labelAbove ? (
  <div style={{ marginBottom: 16 }}>
    {(field.label || field.info) && (
      <label style={styles.label}>
        {t(field.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
        {field.info && <InfoTooltip info={field.info} />}
      </label>
    )}
    <div style={{ marginTop: 6 }}>
      {renderField( field,
                                value,
                                values,
                                onChange,
                                onAction,
                                assessmentRegistry,
                                formReadOnly,
                                {
                                    enabled: schema?.enableLanguageToggle === true,
                                    lang: language,
                                    showScores
                                  }
                              )}
                            </div>
                          </div>
                        ) : field.type === "radio" && !field.inRow ? (
                          <div style={styles.radioRow}>
                            {(field.label || field.info) && (
                              <div style={styles.radioLabel}>
                                {t(field.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
                                {field.info && <InfoTooltip info={field.info} />}
                              </div>
                            )}
                            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 16 }}>
                              {renderField(
                                field,
                                value,
                                values,
                                onChange,
                                onAction,
                                assessmentRegistry,
                                formReadOnly,
                                {
                                  enabled: schema?.enableLanguageToggle === true,
                                  lang: language,
                                  showScores
                                }
                              )}
                            </div>
                          </div>

                        
                        ) : field.type === "subheading" ? (

                              renderField(field, value, values, onChange, onAction, assessmentRegistry, formReadOnly, {
                                enabled: schema?.enableLanguageToggle === true,
                                lang: language,
                                showScores
                              })
                            ) : field.type === "row" ? (
                              /* ✅ ROW FIELDS → Render directly without extra wrapper */
                              renderField(
                                field,
                                value,
                                values,
                                onChange,
                                onAction,
                                assessmentRegistry,
                                formReadOnly,
                                {
                                  enabled: schema?.enableLanguageToggle === true,
                                  lang: language,
                                  showScores
                                }

                              )
                            ) : (
                              <div style={{ marginBottom: 16 }}>

                                <>
                                  {!["button", "subheading", "radio-matrix", "score-box", "inline-input", "grid-row", "grid-header"].includes(field.type)
                                    && field.type !== "checkbox-group"
                                    && (
                                      <label style={styles.label}>
                                        {t(field.label, schema?.enableLanguageToggle ? (language || "en") : "en")}
                                      </label>
                                    )}


                                  {renderField(
                                    field,
                                    value,
                                    values,
                                    onChange,
                                    onAction,
                                    assessmentRegistry,
                                    formReadOnly,
                                    {
                                      enabled: schema?.enableLanguageToggle === true,
                                      lang: language,
                                      matrixColumnWidth,
                                      showScores
                                    }
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
                        </React.Fragment>
                      );

                    })}
                        </>
                    );
                  })()}
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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


const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) {
    // Handle bilingual objects {en: "...", ms: "..."}
    return text[lang] || text.en || "";
  }
  return String(text);
};

function ScoresToggle({ enabled, onToggle }) {
  return (
    <div style={langSwitch.wrap}>
      <span style={langSwitch.label}>Doctor View</span>
      <div
        style={{
          ...langSwitch.track,
          backgroundColor: enabled ? "#2563eb" : "#e5e7eb"
        }}
        onClick={onToggle}
      >
        <div
          style={{
            ...langSwitch.thumb,
            transform: enabled ? "translateX(20px)" : "translateX(0)"
          }}
        />
      </div>
    </div>
  );
}

function MalayToggle({ enabled, onToggle }) {
  return (
    <div style={langSwitch.wrap}>
      <span style={langSwitch.label}>Malay</span>
      <div
        style={{
          ...langSwitch.track,
          backgroundColor: enabled ? "#2563eb" : "#e5e7eb"
        }}
        onClick={onToggle}
      >
        <div
          style={{
            ...langSwitch.thumb,
            transform: enabled ? "translateX(20px)" : "translateX(0)"
          }}
        />
      </div>
    </div>
  );
}

const langSwitch = {
  wrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 10px",
    borderRadius: 8,
    background: "#f8fafc",
    border: "1px solid #e5e7eb"
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a"
  },
  track: {
    width: 42,
    height: 22,
    borderRadius: 999,
    position: "relative",
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  thumb: {
    width: 18,
    height: 18,
    background: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: 2,
    left: 2,
    transition: "transform 0.2s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
  }
};


function MultiSelectDropdown({ field, value, onChange, languageConfig }) {
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
        .map(o => t(o.label, languageConfig?.enabled ? languageConfig.lang : "en"))
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
              {languageConfig?.enabled ? t(opt.label, languageConfig.lang) : opt.label}
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
      setShowModal(true); // open modal immediately after upload
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div style={{ width: "100%", maxWidth: 320 }}>
        <input
          ref={inputRef}
          type="file"
          accept={field.accept || "image/*,.pdf"}
          onChange={e => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />

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

        {value?.data && (
          <div
            style={{
              marginTop: 6,
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "6px 8px",
              background: "#fff",
              fontSize: 12,
              color: "#1f2937",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {value.filename}
          </div>
        )}
      </div>

      {/* MODAL – IMAGE ONLY, MEDIUM SIZE */}
      {showModal && value?.data && (
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
              padding: 16,
              maxWidth: "70%",
              maxHeight: "70%"
            }}
          >
            <img
              src={value.data}
              alt=""
              style={{
                width: "100%",
                maxHeight: "60vh",
                objectFit: "contain",
                borderRadius: 8
              }}
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
  assessmentRegistry,
  languageConfig
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
            {t(opt.label, languageConfig?.enabled ? languageConfig.lang : "en")}
          </button>
        ))}
      </div>

      {ActiveComponent ? (
        <div style={{ marginTop: 20, width: '100%' }}>
          <ActiveComponent values={values} onChange={onChange} layout="nested" />
        </div>
      ) : null}
    </div>
  );
}

function RadioMatrixRow({ field, value, onChange, columnWidth, showScores, languageConfig }) {
  // Fixed width for question column, equal widths for option columns
  const questionColumnWidth = field.wideLabel ? 400 : 200; // Fixed width for question column
  const optionsCount = field.options?.length || 4;
  const rowStyle = {
    ...styles.matrixRow,
    gridTemplateColumns: `${questionColumnWidth}px repeat(${optionsCount}, 1fr)`
  };

  return (
    <div style={rowStyle}>
      <div style={styles.matrixLabel}>
        {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
        {field.showInfoInRow !== false && (
          <>
            {field.rowInfo && <InfoTooltip info={field.rowInfo} />}
            {!field.rowInfo && field.info && (showScores !== false) && <InfoTooltip info={field.info} />}
          </>
        )}
      </div>



      <div style={styles.matrixOptions}>
        {field.options.map((opt) => (
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
  assessmentRegistry,
  formReadOnly = false,
  languageConfig
) {
  const readOnly = formReadOnly || field.readOnly;

  switch (field.type) {
    case "input":
      return (
        <input
          style={styles.input}
          value={value || ""}
          readOnly={readOnly}
          placeholder={t(field.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
          onChange={e =>
            !readOnly && onChange(field.name, e.target.value)
          }
        />
      );
      case "scale-slider":
  return (
    <ScaleSlider
      field={field}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
    case "milestone-grid":
      return (
        <div>
          <div style={styles.subheading}>{t(field.heading, languageConfig?.enabled ? languageConfig.lang : "en")}</div>

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
                <div style={styles.milestoneLabel}>{t(row.left.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>
                <input
                  style={styles.input}
                  value={values[row.left.name] || ""}
                  placeholder={languageConfig?.enabled ? t(row.left.placeholder, languageConfig.lang) || "" : (row.left.placeholder || "")}
                  onChange={e =>
                    onChange(row.left.name, e.target.value)
                  }
                />
              </div>

              {/* RIGHT (only if present) */}
              {row.right && (
                <div>
                  <div style={styles.milestoneLabel}>{languageConfig?.enabled ? t(row.right.label, languageConfig.lang) : row.right.label}</div>
                  <input
                    style={styles.input}
                    value={values[row.right.name] || ""}
                    placeholder={t(row.right.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
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

    case "dynamic-goals": {
  const rows = values[field.name] || [];

  const updateRow = (idx, key, val) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [key]: val };
    onChange(field.name, next);
  };

  const addRow = () => {
    onChange(field.name, [
      ...rows,
      {
        description: "",
        sessionsPerWeek: "",
        minutesPerSession: "",
        plannedDurationWeeks: "",
        targetDate: ""
      }
    ]);
  };

  const removeRow = (idx) => {
    const next = rows.filter((_, i) => i !== idx);
    onChange(field.name, next);
  };

  return (
    <div style={{ marginTop: 10 }}>
      {rows.map((row, idx) => (
        <div
          key={idx}
          style={{
            position: "relative",
            border: "1px solid #e5e7eb",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "16px",
            background: "#ffffff"
          }}
        >
          {/* Header */}
          <div style={{ fontWeight: 600, marginBottom: 12 }}>
            Goal {idx + 1}
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => removeRow(idx)}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "transparent",
              border: "none",
              color: "#ef4444",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>

          {/* Goal Description */}
          <textarea
            placeholder="Goal Description"
            value={row.description}
            onChange={(e) =>
              updateRow(idx, "description", e.target.value)
            }
            style={{
              width: "100%",
              minHeight: "80px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              padding: "8px"
            }}
          />

          {/* Frequency Section */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="number"
              placeholder="Sessions / week"
              value={row.sessionsPerWeek}
              onChange={(e) =>
                updateRow(idx, "sessionsPerWeek", e.target.value)
              }
              style={styles.inputStyle}
            />

            <input
              type="number"
              placeholder="Minutes / session"
              value={row.minutesPerSession}
              onChange={(e) =>
                updateRow(idx, "minutesPerSession", e.target.value)
              }
              style={styles.inputStyle}
            />

            <input
              type="number"
              placeholder="Planned duration (weeks)"
              value={row.plannedDurationWeeks}
              onChange={(e) =>
                updateRow(idx, "plannedDurationWeeks", e.target.value)
              }
              style={styles.inputStyle}
            />

            <input
              type="date"
              value={row.targetDate}
              onChange={(e) =>
                updateRow(idx, "targetDate", e.target.value)
              }
              style={styles.inputStyle}
            />
          </div>
        </div>
      ))}

      {/* Add Goal Button */}
      <button
        type="button"
        onClick={addRow}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        + Add Goal
      </button>
    </div>
  );
}

case "dynamic-section": {
const rows = values[field.name] ?? [{}];
 
  const updateField = (idx, childName, val) => {
    const next = [...rows];
    next[idx] = {
      ...next[idx],
      [childName]: val
    };
    onChange(field.name, next);
  };
 
  const addBlock = () => {
    onChange(field.name, [...rows, {}]);
  };
 
  const removeBlock = (idx) => {
    const next = rows.filter((_, i) => i !== idx);
    onChange(field.name, next);
  };
 
  return (
    <div style={{ marginTop: 12 }}>
      {rows.map((block, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            background: "#ffffff",
            position: "relative"
          }}
        >

 
          <button
            type="button"
            onClick={() => removeBlock(idx)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              border: "none",
              background: "transparent",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: 16
            }}
          >
            ✕
          </button>
 
          {/* Render Child Fields */}
          {field.fields.map(child => {
 
            // Handle showIf inside block
            if (child.showIf) {
              const depVal = block[child.showIf.field];
              if (
                child.showIf.includes &&
                (!Array.isArray(depVal) || !depVal.includes(child.showIf.includes))
              ) return null;
            }
 
            return (
              <div key={child.name} style={{ marginBottom: 14 }}>
                {child.label && (
                  <label style={styles.label}>
                    {child.label}
                  </label>
                )}
 
                {renderField(
                  { ...child, name: child.name },
                  block[child.name],
                  block,
                  (name, val) => updateField(idx, name, val),
                  onAction,
                  assessmentRegistry,
                  formReadOnly,
                  languageConfig
                )}
              </div>
            );
          })}
        </div>
      ))}
 
      <button
        type="button"
        onClick={addBlock}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        + Add More
      </button>
    </div>
  );
}
    case "enteral-feeding-table": {
      const rows = values[`${field.name}_rows`] || [{ time: "", scoops: "", water: "", flushing: "" }];
      const updateRow = (idx, col, val) => {
        const next = [...rows];
        if (!next[idx]) next[idx] = { time: "", scoops: "", water: "", flushing: "" };
        next[idx] = { ...next[idx], [col]: val };
        onChange(`${field.name}_rows`, next);
      };
      const addRow = () => {
        const last = rows.length > 0 ? rows[rows.length - 1] : { time: "", scoops: "", water: "", flushing: "" };
        const newRow = { time: "", scoops: last.scoops || "", water: last.water || "", flushing: last.flushing || "" };
        onChange(`${field.name}_rows`, [...rows, newRow]);
      };
      const removeRow = (idx) => onChange(`${field.name}_rows`, rows.filter((_, i) => i !== idx));
      const template = "repeat(4, 1fr) 70px";
      return (
        <div style={{ marginTop: 10 }}>
          {/* Header row */}
          <div style={{ ...styles.gridHeaderRow, gridTemplateColumns: template }}>
            <div style={styles.gridHeaderCell}>Time</div>
            <div style={styles.gridHeaderCell}>Scoops</div>
            <div style={styles.gridHeaderCell}>Water</div>
            <div style={styles.gridHeaderCell}>Flushing</div>
            <div style={styles.gridHeaderCell}></div>
          </div>
          {/* Data rows */}
          {rows.map((row, idx) => (
            <div key={idx} style={{ ...styles.gridRow, gridTemplateColumns: template }}>
              <input
                type="time"
                value={row.time || ""}
                onChange={e => updateRow(idx, "time", e.target.value)}
                style={styles.gridInput}
              />
              <input
                type="text"
                value={row.scoops || ""}
                onChange={e => updateRow(idx, "scoops", e.target.value)}
                style={styles.gridInput}
              />
              <input
                type="text"
                value={row.water || ""}
                onChange={e => updateRow(idx, "water", e.target.value)}
                style={styles.gridInput}
              />
              <input
                type="text"
                value={row.flushing || ""}
                onChange={e => updateRow(idx, "flushing", e.target.value)}
                style={styles.gridInput}
              />
              <button type="button" onClick={() => removeRow(idx)} style={{ padding: "6px 8px", fontSize: 12, background: "#ef4444", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addRow} style={{ marginTop: 8, padding: "6px 12px", background: "#2563eb", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>+ Add Row</button>
        </div>
      );
    }
    case "grid-table-flat":
      const colCount = field.headers.length;
      return (
        <div style={styles.tableWrap}>
          {/* Header row */}
          <div style={{ ...styles.tableHeaderFlat, gridTemplateColumns: `120px repeat(${colCount}, 1fr)` }}>
            <div></div>
            {field.headers.map(h => (
              <div key={h} style={styles.tableHeaderCell}>{h}</div>
            ))}
          </div>

          {/* Data rows */}
          {field.rows.map(row => (
            <div key={row.key} style={{ ...styles.tableRowFlat, gridTemplateColumns: `120px repeat(${colCount}, 1fr)` }}>
              <div style={styles.tableRowLabel}>{languageConfig?.enabled ? t(row.label, languageConfig.lang) : row.label}</div>

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

    case "info-text":
      return (
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "#0F172A" }}>
          {Array.isArray(field.text)
            ? field.text.map((t, i) => <div key={i}>{t}</div>)
            : field.text}
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
                  {t(col.label, languageConfig?.enabled ? languageConfig.lang : "en")}
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
                  <td style={styles.tdLabel}>
                    {t(rowLabel, languageConfig?.enabled ? languageConfig.lang : "en")}</td>
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


    case "refraction-col": {
      const rows = field.rows || [];
      const groups = field.groups || [];

      // Build flat columns with group boundaries
      const groupMeta = [];
      let cursor = 0;

      groups.forEach((g, gi) => {
        groupMeta.push({
          groupIndex: gi,
          start: cursor,
          length: g.columns.length
        });
        cursor += g.columns.length;
      });

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
                {languageConfig?.enabled ? t(g.label, languageConfig.lang) : g.label}
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
              <div style={styles.refraction12RowLabel}>{t(r.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>

              {flatCols.map((_, i) => {
                const key = `${field.name}_${r.value}_${i}`;

                // Find which group this column belongs to
                const meta = groupMeta.find(
                  g => i >= g.start && i < g.start + g.length
                );

                const isGroupStart = meta && i === meta.start;

                // 🔹 Merge inside each group (e.g. Sphere → Prism for ADD)
                if (r.merge && isGroupStart) {
                  return (
                    <input
                      key={key}
                      style={{
                        ...styles.refraction12Input,
                        gridColumn: `span ${Math.min(r.merge, meta.length)}`
                      }}
                      value={values[`${field.name}_${r.value}_${meta.groupIndex}_merged`] || ""}
                      onChange={e =>
                        onChange(
                          `${field.name}_${r.value}_${meta.groupIndex}_merged`,
                          e.target.value
                        )
                      }
                    />
                  );
                }

                // Skip merged cells inside that group
                if (
                  r.merge &&
                  meta &&
                  i > meta.start &&
                  i < meta.start + Math.min(r.merge, meta.length)
                ) {
                  return null;
                }

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

    case "image-anatomy-selector":
      return (
        <AnatomyImageOverlayInputs

          image={field.image}
          fields={field.markers}
          values={values}
          onChange={onChange}
          width={field.width}
          height={field.height}
        />
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
              if ("oneOf" in f.showIf) {
                const allowedValues = Array.isArray(f.showIf.oneOf) ? f.showIf.oneOf : [f.showIf.oneOf];
                if (!allowedValues.includes(depVal)) return null;
              }
              // Note: oneOf check appears twice (lines 1134-1137 and 1139-1142) - likely a duplicate
            }

            const v = values[f.name];
            return (
              <div key={f.name} style={rowAllButtons ? { flex: "0 0 auto" } : undefined}>
                {f.label && !["button", "checkbox-group"].includes(f.type) && (
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "#0f172a"
                    }}
                  >
                    {languageConfig?.enabled ? t(f.label, languageConfig.lang) : f.label}
                  </label>
                )}

                {/* ✅ Pass correct arguments */}
                {renderField(
                  f,
                  v,
                  values,
                  onChange,
                  onAction,
                  assessmentRegistry,
                  formReadOnly,
                  languageConfig
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
            {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
          </div>
          <div style={styles.scoreValue}>
            {value ?? 0}
          </div>
        </div>
      );

    case "grid-header": {
      const colsCount = field.cols.length;
      // Use custom template if provided, otherwise default
      const template = field.template || (field.wideLabel ? `400px repeat(${colsCount}, 80px)` : `180px repeat(${colsCount}, 1fr)`);

      return (
        <div style={{ ...styles.gridHeaderRow, gridTemplateColumns: template }}>
          <div style={styles.gridHeaderCell}>
            {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
            {field.info && <InfoTooltip info={field.info} />}
          </div>
          {field.cols.map(col => (
            <div key={col} style={styles.gridHeaderCell}>
              {languageConfig?.enabled ? t(col, languageConfig.lang) : col}
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
            alt={t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
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
          <div style={styles.gridLabel}>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>
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
                  {(col.options || []).map((opt, i) => {
                    const val = typeof opt === "object" && opt !== null && "value" in opt ? opt.value : opt;
                    const label = typeof opt === "object" && opt !== null && "label" in opt ? opt.label : opt;
                    const display = t(label, languageConfig?.enabled ? languageConfig.lang : "en") || String(val ?? "");
                    return (
                      <option key={val ?? i} value={val}>
                        {display}
                      </option>
                    );
                  })}
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
                    assessmentRegistry,
                    formReadOnly,
                    {
                      showScores: languageConfig?.showScores
                    }
                  )}
                </div>
              );
            }

            // Handle static (read-only) text column – e.g. Normal values in ROM tables
            if (typeof col === "object" && col.type === "static") {
              return (
                <div
                  key={fieldKey}
                  style={{
                    ...styles.gridInput,
                    display: "flex",
                    alignItems: "center",
                    color: "#64748b",
                    backgroundColor: "#f8fafc",
                    cursor: "default",
                    pointerEvents: "none"
                  }}
                >
                  {col.value ?? ""}
                </div>
              );
            }

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
              {t(field.right.title, languageConfig?.enabled ? languageConfig.lang : "en")}
            </div>
            <div style={styles.pairedTitleCell}>
              {t(field.left.title, languageConfig?.enabled ? languageConfig.lang : "en")}
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
                  {t(opt.label, languageConfig?.enabled ? languageConfig.lang : "en")}
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
                  {t(opt.label, languageConfig?.enabled ? languageConfig.lang : "en")}
                </option>
              ))}
            </select>
          </div>
        </div>
      );


    case "textarea":
      return (
        <textarea
          style={styles.textarea}
          value={value || ""}
          readOnly={readOnly}
          onChange={e =>
            !readOnly && onChange(field.name, e.target.value)
          }
        />
      );
    case "date":
      return (
        <input
          type="date"
          style={styles.input}
          value={value || ""}
          readOnly={readOnly}
          disabled={readOnly}
          onChange={e => !readOnly && onChange(field.name, e.target.value)}
        />
      );



    case "single-select":
      return (
        <select
          style={styles.select}
          value={value ?? ""}
          disabled={readOnly}
          onChange={e => !readOnly && onChange(field.name, e.target.value)}
        >
          <option value="">Select</option>
          {(field.options || []).map(opt => (
            <option key={opt.value} value={opt.value}>
              {languageConfig?.enabled ? t(opt.label, languageConfig.lang) : opt.label}
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
          columnWidth={languageConfig?.matrixColumnWidth}
          showScores={languageConfig?.showScores}
          languageConfig={languageConfig}
        />
      );


      case "radio": {
        const opts = field.options || [];
        return (
          <div style={{ marginTop: 6 }}>
            <div style={styles.inlineGroup}>
              {opts.map((opt, idx) => {
                const optVal = typeof opt === "object" && opt !== null ? opt.value : opt;
                const optLabel = typeof opt === "object" && opt !== null ? opt.label : opt;
                return (
                  <label key={optVal ?? idx} style={styles.inlineItem}>
                    <input
                      type="radio"
                      name={field.name}
                      checked={value === optVal}
                      disabled={readOnly}
                      onChange={() => !readOnly && onChange(field.name, optVal)}
                    />
                    {typeof optLabel === "object" && optLabel !== null && !Array.isArray(optLabel) ? t(optLabel, languageConfig?.lang) : (typeof optLabel === "string" || typeof optLabel === "number" ? optLabel : String(optLabel ?? ""))}
                  </label>
                );
              })}
            </div>
          </div>
        );
      }
    case "attach-file":
      return (
        <div style={{ marginBottom: 0 }}>
          <label style={styles.label}>
            {t(field.title, languageConfig?.enabled ? languageConfig.lang : "en")}
            {field.required && <span style={{ color: "red" }}> *</span>}
          </label>

          <div style={styles.inlineGroup}>
            {(!value || !field.hideInputAfterSelect) && (
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
            )}

            {/* Preview / filename */}
            {value && !Array.isArray(value) && (
              <FilePreview file={value} previewSize={field.previewSize} />
            )}

            {Array.isArray(value) &&
              value.map((file, idx) => (
                <FilePreview key={idx} file={file} previewSize={field.previewSize} />
              ))}
          </div>
        </div>
      );


    case "paired-text":
      const pairs = field.pairs || [];

      return (
        <div style={styles.field}>
          <label style={styles.label}>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</label>

          <div style={{ display: "flex", gap: 12 }}>
            {pairs.map(pair => (
              <div key={pair.name} style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", }}>
                  {t(pair.title || pair.label, languageConfig?.enabled ? languageConfig.lang : "en")}
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
          languageConfig={languageConfig}
        />
      );


    case "checkbox-group":
      const inline = field.position === "side";

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
            <label style={styles.label}>
              {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
            </label>

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
                    disabled={readOnly}
                    onChange={() => {
                      if (readOnly) return;
                      const next = value?.includes(opt.value)
                        ? value.filter(v => v !== opt.value)
                        : [...(value || []), opt.value];
                      onChange(field.name, next);
                    }}
                  />
                  {t(opt.label, languageConfig?.enabled ? languageConfig.lang : "en")}
                </label>
              ))}
            </div>
          </div>
        );
      }

      /* DEFAULT BEHAVIOUR (label on top) */
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {field.label ? (
            <label style={styles.label}>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</label>
          ) : null}

          <div style={styles.inlineGroup}>
            {(field.options || []).map((opt) => (
              <label key={opt.value} style={styles.inlineItem}>
                <input
                  type="checkbox"
                  checked={(value || []).includes(opt.value)}
                  disabled={readOnly}
                  onChange={() => {
                    if (readOnly) return;
                    const next = (value || []).includes(opt.value)
                      ? value.filter((v) => v !== opt.value)
                      : [...(value || []), opt.value];
                    onChange(field.name, next);
                  }}
                />
                {t(opt.label, languageConfig?.enabled ? languageConfig.lang : "en")}
              </label>
            ))}
          </div>
        </div>
      );






    case "subheading":
      return (
        <div style={styles.subheading}>
          {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
        </div>
      );

    case "multi-select-dropdown":
      return (
        <MultiSelectDropdown
          field={field}
          value={value || []}
          onChange={onChange}
          languageConfig={languageConfig}
        />
      );
    case "inline-input":
      return (
        <div style={styles.inlineRow}>
          <div style={styles.inlineLabel}>{t(field.inlineLabel, languageConfig?.enabled ? languageConfig.lang : "en")}</div>
          <input
            style={styles.inlineInput}
            value={value || ""}
            onChange={e => onChange(field.name, e.target.value)}
            placeholder={t(field.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
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
          <div style={{ fontWeight: 600, color: "#0f172a" }}>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>

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
      const handleButtonClick = () => {
        if (field.name && field.toggleValue) {
          onChange(field.name, !values[field.name]);
        }
        if (field.action) {
          onAction?.(field.action);
        }
      };
      return (
        <button
          type="button"
          style={styles.btnOutline}
          onClick={handleButtonClick}
        >
          {t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}
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
              <div style={styles.refractionTableRowLabel}>{languageConfig?.enabled ? t(row.label, languageConfig.lang) : row.label}</div>

              {[0, 1].map(eye => (
                <div key={`${rowIdx}-eye-${eye}`} style={styles.refractionTableHeaderGroup}>
                  {eyeColumns.map((col, colIdx) => {
                    const baseKey = `${field.name}_${row.value}_${eye === 0 ? "re" : "le"}`;
                    const fieldName = `${baseKey}_${colIdx}`;

                    // 🔹 Dynamic merge from schema
                    if (row.merge && colIdx === 0) {
                      return (
                        <input
                          key={fieldName}
                          style={{
                            ...styles.refractionTableInput,
                            gridColumn: `span ${row.merge}`
                          }}
                          value={values[`${baseKey}_merged`] || ""}
                          onChange={e =>
                            onChange(`${baseKey}_merged`, e.target.value)
                          }
                        />
                      );
                    }

                    // Skip merged columns
                    if (row.merge && colIdx > 0 && colIdx < row.merge) {
                      return null;
                    }

                    return (
                      <input
                        key={fieldName}
                        style={styles.refractionTableInput}
                        value={values[fieldName] || ""}
                        onChange={e => onChange(fieldName, e.target.value)}
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
              <div style={styles.refractionTableRowLabel}>{languageConfig?.enabled ? t(row.label, languageConfig.lang) : row.label}</div>
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

      const flatCols = groups.flatMap(g => g.columns);
      const colCount = flatCols.length;

      const gridTemplate = `200px repeat(${colCount}, 1fr)`;

      return (
        <div style={styles.vaWrap}>
          <div style={{ display: "grid", gridTemplateColumns: gridTemplate }}>
            <div style={styles.vaCorner} />
            {groups.map((g, i) => (
              <div
                key={i}
                style={{
                  ...styles.vaGroupHeader,
                  gridColumn: `span ${g.columns.length}`
                }}
              >
                {languageConfig?.enabled ? t(g.label, languageConfig.lang) : g.label}
              </div>
            ))}
          </div>

          {/* <div style={{ display: "grid", gridTemplateColumns: gridTemplate }}>
  <div style={styles.vaCorner} />
  {flatCols.map((c, i) => (
    <div key={i} style={styles.vaColHeader}>
      {c.key}
    </div>
  ))}
</div> */}


          <div style={{ overflowX: "auto" }}>
            {rows.map(r => {
              const rowCols = r.columns || flatCols;

              return (
                <div
                  key={r.value}
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplate,
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >
                  <div style={styles.vaRowLabel}>{t(r.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>

                  {r.remark ? (
                    <textarea
                      style={{ ...styles.vaRemark, gridColumn: `span ${colCount}` }}
                      placeholder="Enter remarks…"
                      value={values[`${field.name}_${r.value}`] || ""}
                      onChange={e =>
                        onChange(`${field.name}_${r.value}`, e.target.value)
                      }
                    />
                  ) : (
                    rowCols.map((col, i) => {
                      const key = `${field.name}_${r.value}_${i}`;
                      const v = values[key] || "";

                      return (
                        <div key={key} style={styles.vaCell}>
                          {col.type === "select" ? (
                            <select
                              value={v}
                              onChange={e => onChange(key, e.target.value)}
                              style={styles.vaSelect}
                            >
                              <option value="">Select</option>
                              {(col.options || []).map((o, i) => {
                                const val = typeof o === "object" && o !== null && "value" in o ? o.value : o;
                                const label = typeof o === "object" && o !== null && "label" in o ? o.label : o;
                                const display = typeof label === "string" || typeof label === "number" ? label : String(val ?? "");
                                return (
                                  <option key={val ?? i} value={val}>{display}</option>
                                );
                              })}
                            </select>
                          ) : (
                            <input
                              value={v}
                              onChange={e => onChange(key, e.target.value)}
                              style={styles.vaInput}
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}

          </div>
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
              <div style={styles.refractionTableRowLabel}>{languageConfig?.enabled ? t(row.label, languageConfig.lang) : row.label}</div>
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

function FilePreview({ file, previewSize }) {
  if (!file) return null;
  const fileName = file.name ?? file.filename ?? "File";
  const fileType = typeof file.type === "string" ? file.type : "";
  const isBlobOrFile = file instanceof File || file instanceof Blob;
  const isImage = fileType.startsWith("image/") && isBlobOrFile;

  if (isImage) {
    try {
      const url = URL.createObjectURL(file);
      return <FilePreviewImage url={url} fileName={fileName} previewSize={previewSize} />;
    } catch {
      return (
        <div style={{ marginTop: 6, fontSize: 13, color: "#2563eb" }}>
          📄 {fileName}
        </div>
      );
    }
  }
  return (
    <div style={{ marginTop: 6, fontSize: 13, color: "#2563eb" }}>
      📄 {fileName}
    </div>
  );
}

function ScaleSlider({ field, value = field.min, onChange, readOnly }) {
  const { min, max, step = 1, ranges = [], showValue } = field;

  const steps = Math.floor((max - min) / step);

  const gradient =
    ranges.length > 0
      ? `linear-gradient(to right, ${ranges
          .map(r => `${r.color} ${(r.min - min) / (max - min) * 100}% ${(r.max - min) / (max - min) * 100}%`)
          .join(",")})`
      : "linear-gradient(to right, #9ca3af, #9ca3af)";

  const getRange = v =>
    ranges.find(r => v >= r.min && v <= r.max);

  return (
    <div style={{ marginTop: 10 }}>
      {/* NUMBERS */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        {Array.from({ length: steps + 1 }, (_, i) => min + i * step).map(n => (
          <span key={n}>{n}</span>
        ))}
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={readOnly}
        onChange={e => onChange(field.name, Number(e.target.value))}
        style={{
          width: "100%",
          marginTop: 6,
          appearance: "none",
          height: 8,
          borderRadius: 999,
          background: gradient,
          outline: "none"
        }}
      />

      {/* VALUE */}
      {showValue && (
        <div style={{ marginTop: 6, fontSize: 13 }}>
          Selected: <b>{value}</b>
          {getRange(value) && (
            <> – <span style={{ color: getRange(value).color }}>
              {getRange(value).label}
            </span></>
          )}
        </div>
      )}
    </div>
  );
}

function FilePreviewImage({ url, fileName, previewSize }) {
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return (
    <div style={{ marginTop: 6 }}>
      <img
        src={url}
        alt={fileName}
        style={{
          width: previewSize?.width || 160,
          height: previewSize?.height || 120,
          maxWidth: previewSize?.width || 160,
          maxHeight: previewSize?.height || 120,
          borderRadius: 6,
          border: "1px solid #ddd",
          objectFit: "contain"
        }}
      />
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
  actionsBar: {
    display: "flex",
    alignItems: "center",
    gap: 16
  },

  actionControls: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },

  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
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
    gridTemplateColumns: "400px repeat(4, 1fr)", // Fixed question column, equal option columns
    gap: "0 16px", // Horizontal gap between columns
    marginBottom: 12,
    borderBottom: "2px solid #d1d5db",
    fontSize: 14,
    fontWeight: 600,
    paddingBottom: 12,
    color: "#0F172A"
  },

matrixHeaderCell: {
     textAlign: "center",
     padding: "0 8px",
     width: "100%",
     overflowWrap: "break-word",
     wordBreak: "break-word",
     minWidth: 0  // lets the cell shrink so wrapping can occur
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
    gridTemplateColumns: "400px repeat(4, 1fr)", // Fixed question column, equal option columns
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
    display: "contents" // Use parent grid columns
  },

  matrixCell: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    width: "100%"
  },

  inlineLabel: {
    fontWeight: 500,
    color: "#0f172a"
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
    alignItems: "center",
    color: "#0f172a"
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
   inputStyle :{
  flex: "1",
  minWidth: "180px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db"
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
  },
  vaWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    overflow: "hidden",
    background: "#ffffff",
    marginTop: 16,
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)"
  },
  vaCorner: {
    background: "#f8fafc",
    borderRight: "1px solid #eef2f7",
    height: 56
  },

  vaGroupHeader: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
    padding: "14px 6px",
    background: "linear-gradient(#f8fafc, #eef2f7)",
    borderRight: "1px solid #eef2f7"
  },

  vaColHeader: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 12,
    color: "#334155",
    padding: "10px 4px",
    background: "#fafafa",
    borderRight: "1px solid #eef2f7"
  },

  vaRowLabel: {
    padding: "0 16px",
    fontWeight: 600,
    fontSize: 13,
    background: "#f9fafb",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    lineHeight: 1.4
  },

  vaCell: {
    borderRight: "1px solid #e5e7eb",
    padding: 10,
    display: "flex",
    alignItems: "center"
  },

  vaSelect: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: 13,
    padding: "0 12px",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath fill='%23334155' d='M5.5 7.5L10 12l4.5-4.5'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "12px"
  },

  vaInput: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    fontSize: 13,
    padding: "0 10px",
    background: "#ffffff"
  },

  vaRemark: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
    fontSize: 13,
    resize: "none",
    background: "#ffffff"
  },
};