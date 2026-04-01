import React, { useEffect, useRef, useState } from "react";
import AnatomyImageOverlayInputs from "./AnatomyImageSelector";
import AudiogramGraph from "../Audiology/components/AudioGramGraph";
import WoundLocationMarker from "../Nursing/components/WoundLocationMarker";

function DrawCanvasField({ field, value, onChange }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  const width = field.width || 320;
  const height = field.height || 260;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = value || field.backgroundImage || "";
  }, [value, field.backgroundImage, width, height]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * width,
      y: ((clientY - rect.top) / rect.height) * height,
    };
  };

  const start = (e) => {
    e.preventDefault();
    const p = getPoint(e);
    isDrawingRef.current = true;
    lastRef.current = p;
  };

  const move = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = getPoint(e);
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  };

  const end = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL("image/png");
    onChange(field.name, data);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    onChange(field.name, "");
  };

  return (
    <div style={{ marginTop: 6 }}>
      <div
        style={{
          position: "relative",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          overflow: "hidden",
          width,
          height,
          background: "#ffffff",
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ width, height, touchAction: "none", display: "block" }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        style={{
          marginTop: 6,
          padding: "4px 10px",
          borderRadius: 6,

          cursor: "pointer",
          fontSize: 12,
        }}
      >
        Clear drawing
      </button>
    </div>
  );
}

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

/**
 * Transforms schema fields to add optional-section toggles for follow-up mode.
 * For each subheading whose label is in optionalSectionLabels, inserts an
 * optional-section-toggle before it and adds showIf to all subsequent fields
 * until the next optional section.
 * @param {Array} fields - Flat array of field definitions
 * @param {Array<string>} optionalSectionLabels - Subheading labels to make optional
 * @returns {Array} Transformed fields
 */
export function withOptionalSections(fields, optionalSectionLabels = []) {
  if (!fields || !Array.isArray(fields) || optionalSectionLabels.length === 0) {
    return fields;
  }
  const labelSet = new Set(optionalSectionLabels.map(s => s.trim().toLowerCase()));
  const result = [];
  let currentControlField = null;

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    const isOptionalSubheading =
      f.type === "subheading" &&
      f.label &&
      labelSet.has(String(f.label).trim().toLowerCase());

    if (isOptionalSubheading) {
      const controlField = `_opt_${String(f.label)
        .replace(/\s+/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")}`;
      result.push({
        type: "optional-section-toggle",
        name: controlField,
        label: f.label
      });
      currentControlField = controlField;
      continue;
    }

    if (currentControlField) {
      const sectionShowIf = { field: currentControlField, equals: true };
      const combinedShowIf = f.showIf
        ? { ...sectionShowIf, and: f.showIf }
        : sectionShowIf;
      result.push({ ...f, showIf: combinedShowIf });
    } else {
      result.push(f);
    }
  }

  return result;
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
                {schema.titleInfo && <InfoTooltip info={schema.titleInfo} />}
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
                                  marginBottom: field.compact
                                    ? 4
                                    : layout === "nested"
                                      ? 10
                                      : 18
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
                                      {renderField(field,
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


                                ) : field.type === "subheading" || field.type === "optional-section-toggle" ? (

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
                                      {!["button", "subheading", "optional-section-toggle", "radio-matrix", "score-box", "inline-input", "grid-row", "grid-header", "accordion"].includes(field.type)
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
function InfoTooltip({ info, children, showIcon = true }) {
  const [open, setOpen] = React.useState(false);

  if (!info) return null;

  const content = typeof info === "string" ? [info] : info.content;

  return (
    <span
      style={styles.infoWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children ? (
        children
      ) : (
        showIcon && <span style={styles.infoIcon}>i</span>
      )}

      {open && (
        <div style={styles.tooltipCard}>
          <div style={styles.tooltipArrow}></div>

          {info.title && (
            <div style={styles.tooltipTitle}>
              {info.title}
            </div>
          )}

          <ul style={styles.tooltipList}>
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
  const defaultValue = field.options?.[0]?.value || null;
  const active = values[activeKey] || (field.autoOpen ? defaultValue : null);
  let component = active ? assessmentRegistry?.[active] : null;
  // Handle both direct component export and default export
  const ActiveComponent = component?.default || component;

  return (
    <div>
      {!field.autoOpen && (
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
      )}

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

const cell = (values, row, key, onChange) => {
  const checked = values?.[row]?.[key] || false
  return (
    <td style={styles.checkedBox} onClick={() => onChange(row, key)} key={key}>
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={styles.hiddenCheckbox}
      />
      { checked && <span className="tick">✓</span>}
    </td>
  )
}

const getColSpan = (col) =>
  col.groups.reduce((sum, g) => sum + g.options.length, 0);

export const DynamicInput = ({ 
  value, 
  onChange, 
  field, 
  readOnly, 
  styles, 
  t, 
  languageConfig 
}) => {
  const [isTextarea, setIsTextarea] = useState(false);
  const currentValue = value || "";
  const inputRef = useRef(null);

  // 1. Auto-switch based on character count
  useEffect(() => {
    if (currentValue.length >= 50) {
      setIsTextarea(true);
    } else {
      // Only switch back if it wasn't forced by Enter/Newline logic
      // Note: If you want it to strictly follow length, keep this. 
      // If you want it to stay textarea once Enter is hit, remove the 'else'.
      setIsTextarea(false);
    }
  }, [currentValue.length]);

  // 2. Restore focus after switching types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Place cursor at the very end
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isTextarea]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stop form submission
      
      // CRITICAL: Force switch to textarea immediately so the new line renders
      setIsTextarea(true); 
      
      // Add the newline character
      const newValue = currentValue + '\n';
      onChange(field.name, newValue);
    }
  };

  const placeholder = t(field.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || "";

  // Render Textarea
  if (isTextarea) {
    return (
      <textarea
        ref={inputRef}
        style={{
          ...styles.input,
          whiteSpace: 'pre-wrap', // Ensures new lines render correctly
          overflowY: 'auto'
        }}
        value={currentValue}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => !readOnly && onChange(field.name, e.target.value)}
        rows={3}
      />
    );
  }

  // Render Input
  return (
    <input
      ref={inputRef}
      style={styles.input}
      value={currentValue}
      readOnly={readOnly}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onChange={(e) => !readOnly && onChange(field.name, e.target.value)}
    />
  );
};

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
        <DynamicInput
          value={value}
          onChange={onChange}
          field={field}
          readOnly={readOnly}
          styles={styles}
          t={t}
          languageConfig={languageConfig}
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
                    {child.label && child.type !== "subheading" && child.type !== "checkbox-group" && (
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

     case "grid-table-flat": {
      const colCount = field.headers.length;

      // Optional per-cell hiding logic:
      // - field.hiddenCells can be:
      //   * an array of { rowKey, header }
      //   * or a function (rowKey, header) => boolean
      let hiddenSet = null;
      if (Array.isArray(field.hiddenCells)) {
        hiddenSet = new Set(
          field.hiddenCells.map(c => `${c.rowKey}::${c.header}`)
        );
      }
      const isHidden = (rowKey, header) => {
        if (typeof field.hiddenCells === "function") {
          try {
            return field.hiddenCells(rowKey, header);
          } catch (e) {
            return false;
          }
        }
        if (hiddenSet) {
          return hiddenSet.has(`${rowKey}::${header}`);
        }
        return false;
      };

      // width coming from schema
      const labelWidth = field.labelWidth || "120px";
      const inputWidth = field.inputWidth || "1fr";

      return (
        <div style={styles.tableWrap}>
          {/* Header row */}
          <div
            style={{
              ...styles.tableHeaderFlat,
              gridTemplateColumns: `${labelWidth} repeat(${colCount}, ${inputWidth})`
            }}
          >
            <div></div>

            {field.headers.map(h => (
              <div key={h} style={styles.tableHeaderCell}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {field.rows.map(row => (
            <div
              key={row.key}
              style={{
                ...styles.tableRowFlat,
                gridTemplateColumns: `${labelWidth} repeat(${colCount}, ${inputWidth})`
              }}
            >
              <div style={styles.tableRowLabel}>
                {languageConfig?.enabled
                  ? t(row.label, languageConfig.lang)
                  : row.label}
                {row.info && <InfoTooltip info={row.info} />}
              </div>
              
              {row.isFullRow?( 
                <div
                  style={{
                    gridColumn: `span ${colCount}`
                  }}
                >
                  <input
                  key={row.key+'_'+field.headers[0]}
                  style={{
                    ...styles.tableInput,
                    width: field.boxWidth || "100%"
                  }}
                  value={values[field.name+'_'+row.key+'_'+field.headers[0]] || ""}
                  onChange={e => onChange(field.name+'_'+row.key+'_'+field.headers[0], e.target.value)}
                />
                </div>
                 ):(field.headers.map(h => {
                row.colSpan = row.colSpan - 1
                const cellKey = `${row.key}_${h}`;
                if (isHidden(row.key, h)) {
                  return <div key={cellKey} />;
                }
                const valueKey = `${field.name}_${row.key}_${h}`;
                const cellValue = values[valueKey] || "";
                const options = field.headerOptions && field.headerOptions[h];
                if (options && Array.isArray(options)) {
                  return (
                    <select
                      key={cellKey}
                      style={{
                        ...styles.tableInput,
                        width: field.boxWidth || "100%",
                        padding: "4px 6px"
                      }}
                      value={cellValue}
                      onChange={e => onChange(valueKey, e.target.value)}
                    >
                      <option value="">—</option>
                      {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input
                    key={cellKey}
                    style={{
                      ...styles.tableInput,
                      width: field.boxWidth || "100%"
                    }}
                    value={cellValue}
                    onChange={e => onChange(valueKey, e.target.value)}
                  />
                );
                
              }))}
            </div>
          ))}
        </div>
      );
    }

    case "info-text":
      return (
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "#0F172A" }}>
          {Array.isArray(field.text)
            ? field.text.map((t, i) => <div key={i}>{t}</div>)
            : field.text}
        </div>
      );


case "grid-table-advanced": {

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    background: "#fff"
  };

  const thStyle = {
    border: "1px solid #d1d5db",
    padding: "8px",
    background: "#547faa",
    fontWeight: 600,
    textAlign: "center"
  };

  const tdStyle = {
    border: "1px solid #e5e7eb",
    padding: "6px"
  };

  const inputStyle = {
    width: "100%",
    padding: "6px",
    border: "1px solid #d1d5db",
    borderRadius: "4px"
  };

  const selectStyle = {
    width: "100%",
    padding: "6px",
    border: "1px solid #d1d5db",
    borderRadius: "4px"
  };

  // 🔥 dynamic total
  const total = field.rows.reduce((sum, row) => {
    return sum + (Number(values[`${field.name}_${row.key}_indicator`]) || 0);
  }, 0);

  return (
    <table style={tableStyle}>

      {/* HEADER */}
      <thead>
        <tr>
          {field.headers.map((h, i) => (
            <th key={i} style={thStyle}>{h}</th>
          ))}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>

        {field.rows.map(row => (
          <tr key={row.key}>

            {/* LABEL */}
            <td style={tdStyle}>{row.label}</td>

            {/* DROPDOWN */}
            <td style={tdStyle}>
              <select
                style={selectStyle}
                value={values[`${field.name}_${row.key}_indicator`] || ""}
                onChange={(e) =>
                  onChange(`${field.name}_${row.key}_indicator`, e.target.value)
                }
              >
                <option value="">Select</option>
                {row.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </td>

            {/* 🔥 FULLY DYNAMIC DATE COLUMNS */}
            {Array.from({ length: field.dateColumns }).map((_, i) => (
              <td key={i} style={tdStyle}>
              <input
  type={field.dateType || "date"}   // 🔥 dynamic from schema
  style={inputStyle}
  value={values[`${field.name}_${row.key}_date${i+1}`] || ""}
  onChange={(e) =>
    onChange(`${field.name}_${row.key}_date${i+1}`, e.target.value)
  }
/>
              </td>
            ))}

          </tr>
        ))}

        {/* TOTAL */}
        <tr>
          <td
            colSpan={field.headers.length - 1}
            style={{ ...tdStyle, textAlign: "right", fontWeight: 600 }}
          >
            TOTAL SCORE
          </td>
          <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600 }}>
            {total}
          </td>
        </tr>

      </tbody>

    </table>
  );
}

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
              <th style={styles.th}>
                {field.label || ""}
                {field.info && <InfoTooltip info={field.info} />}
              </th>
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
    case "accordion": {
      const summaryText =
        field?.label != null
          ? languageConfig?.enabled
            ? t(field.label, languageConfig.lang)
            : field.label
          : "";
      const children = field?.children || [];

      return (
        <details
          open={field?.defaultOpen === true}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            background: "#fafafa"
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: 800,
              color: "#111827",
              outline: "none",
              userSelect: "none"
            }}
          >
            {summaryText}
          </summary>

          <div style={{ marginTop: 12 }}>
            {children.map((c, idx) => {
              if (c?.showIf && !evaluateShowIf(c.showIf, values)) return null;
              const childValue = c?.name ? values?.[c.name] : undefined;
              return (
                <div
                  key={c?.name || c?.label || idx}
                  style={{ marginBottom: c?.compact ? 4 : 10 }}
                >
                  {renderField(
                    c,
                    childValue,
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
        </details>
      );
    }
    case "row": {
      // If this row is only buttons, pack them tightly like a toolbar (no big gaps)
      // Otherwise, keep a fixed 2-column grid with top-aligned cells.
      const rowAllButtons = (field.fields || []).every(f => f?.type === "button");
      const rowGap = field.compact ? 8 : 16;
      const visibleChildren = (field.fields || []).filter(f => {
        if (!f?.showIf) return true;
        const depVal = values[f.showIf.field];
        if ("equals" in f.showIf && depVal !== f.showIf.equals) return false;
        if ("exists" in f.showIf && !depVal) return false;
        if ("includes" in f.showIf && (!Array.isArray(depVal) || !depVal.includes(f.showIf.includes))) return false;
        if ("oneOf" in f.showIf) {
          const allowed = Array.isArray(f.showIf.oneOf) ? f.showIf.oneOf : [f.showIf.oneOf];
          if (!allowed.includes(depVal)) return false;
        }
        return true;
      });
      const colCount = rowAllButtons ? undefined : (field.cols || Math.min(visibleChildren.length, 2));
      return (
        <div
          style={rowAllButtons
            ? { display: "flex", flexWrap: "wrap", gap: rowGap, alignItems: "center", justifyContent: "flex-start" }
            : { display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: rowGap, alignItems: "start" }
          }
        >
          {(field.fields || []).map((f, fi) => {
            if (f.showIf) {
              const depVal = values[f.showIf.field];
              if ("equals" in f.showIf && depVal !== f.showIf.equals) return null;
              if ("exists" in f.showIf && !depVal) return null;
              if ("includes" in f.showIf && (!Array.isArray(depVal) || !depVal.includes(f.showIf.includes))) return null;
              if ("oneOf" in f.showIf) {
                const allowed = Array.isArray(f.showIf.oneOf) ? f.showIf.oneOf : [f.showIf.oneOf];
                if (!allowed.includes(depVal)) return null;
              }
            }
            const v = values[f.name];
            return (
              <div key={f.name || fi} style={rowAllButtons ? { flex: "0 0 auto" } : undefined}>
                {f.label && !["button", "checkbox-group", "score-box", "subheading", "accordion"].includes(f.type) && (
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#0f172a" }}>
                    {languageConfig?.enabled ? t(f.label, languageConfig.lang) : f.label}
                  </label>
                )}
                {renderField(f, v, values, onChange, onAction, assessmentRegistry, formReadOnly, languageConfig)}
              </div>
            );
          })}
        </div>
      );
    }

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

    case "score-box": {
      const labelText = t(field.label, languageConfig?.enabled ? languageConfig.lang : "en");
      const infoText = field.info
        ? t(field.info, languageConfig?.enabled ? languageConfig.lang : "en")
        : null;

      const renderedLabel = infoText ? (
        <InfoTooltip
          info={{ title: labelText, content: [infoText] }}
          showIcon={false}
        >
          {labelText}
        </InfoTooltip>
      ) : (
        labelText
      );

      return (
        <div style={styles.scoreBox}>
          <div style={styles.scoreLabel}>
            {renderedLabel}
          </div>
          <div style={styles.scoreValue}>
            {value ?? 0}
          </div>
        </div>
      );
    }

    case "draw-canvas":
      return (
        <DrawCanvasField
          field={field}
          value={value}
          onChange={onChange}
        />
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
              maxHeight: field.maxHeight || 300,
              objectFit: "contain",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              marginTop: 8
            }}
          />
        </div>
      );

    case "audiogram-graph": {
      return(
        <AudiogramGraph/>
      )
    }
    case "grid-row": {
      const colsCount = field.cols.length;
      const template = field.template || `180px repeat(${colsCount}, 1fr)`;

      return (
        <div style={{ ...styles.gridRow, gridTemplateColumns: template }}>
          <div style={styles.gridLabel}>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</div>
          {field.cols.map((col, idx) => {
            const fieldKey = (typeof col === "object" && col.name) ? col.name : `${field.name}_${idx}`;

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
                    backgroundColor: "#f8fafc",
                    fontWeight: 600,
                    pointerEvents: "none",
                    cursor: "default"
                  }}
                >
                  {values[col.name] ?? 0}
                </div>
              );
            }

            // Handle time-input column (HH:MM format)
            if (typeof col === "object" && col.type === "time-input") {
              const [hours, minutes] = (values[fieldKey] || "").split(":").length === 2
                ? values[fieldKey].split(":")
                : ["", ""];
              return (
                <div
                  key={fieldKey}
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                    padding: "8px 4px"
                  }}
                >
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="HH"
                    value={hours}
                    style={{
                      ...styles.gridInput,
                      flex: 1,
                      maxWidth: 50,
                      padding: "6px 4px",
                      textAlign: "center"
                    }}
                    onChange={e => onChange(fieldKey, `${e.target.value || "0"}:${minutes || "0"}`)}
                  />
                  <span style={{ fontWeight: 600, color: "#6b7280", fontSize: 14 }}>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="MM"
                    value={minutes}
                    style={{
                      ...styles.gridInput,
                      flex: 1,
                      maxWidth: 50,
                      padding: "6px 4px",
                      textAlign: "center"
                    }}
                    onChange={e => onChange(fieldKey, `${hours || "0"}:${e.target.value || "0"}`)}
                  />
                </div>
              );
            }
            if ( typeof col === "object" && col.type === "input-number-range") {
              return (
                    <input
                      min={field.min}
                      max={field.max}
                      type="number"
                      style={styles.input}
                      value={values[fieldKey] || ""}
                      readOnly={readOnly}
                      placeholder={t(field.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
                      onChange={e => onChange(fieldKey, e.target.value)}
                    />
              );
            }
            return (
              <input
                key={fieldKey}
                style={{
                  ...styles.gridInput,
                  ...(col.width && { width: col.width })
                }}
                value={values[fieldKey] || ""}
                onChange={e => onChange(fieldKey, e.target.value)}
              />
            );
          })}
        </div>
      );
    }

    case "time-input":
      const [hours, minutes] = (value || "").split(":").length === 2 ? value.split(":") : ["", ""];
      return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            style={{ ...styles.input, flex: 1, maxWidth: 80 }}
            type="number"
            min="0"
            max="59"
            placeholder="HH"
            value={hours}
            readOnly={readOnly}
            onChange={e => {
              const h = e.target.value || "0";
              onChange(field.name, `${h}:${minutes || "0"}`);
            }}
          />
          <span style={{ fontWeight: 600, color: "#6b7280" }}>:</span>
          <input
            style={{ ...styles.input, flex: 1, maxWidth: 80 }}
            type="number"
            min="0"
            max="59"
            placeholder="MM"
            value={minutes}
            readOnly={readOnly}
            onChange={e => {
              const m = e.target.value || "0";
              onChange(field.name, `${hours || "0"}:${m}`);
            }}
          />
        </div>
      );

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
              const optTooltip = typeof opt === "object" && opt !== null ? opt.tooltip : undefined;
              const optColor = typeof opt === "object" && opt !== null ? opt.color : undefined;
              // Ensure both values are same type for comparison
              const isChecked = value != null && (value === optVal || String(value) === String(optVal));
              const labelText =
                typeof optLabel === "object" && optLabel !== null && !Array.isArray(optLabel)
                  ? t(optLabel, languageConfig?.lang)
                  : (typeof optLabel === "string" || typeof optLabel === "number" ? optLabel : String(optLabel ?? ""));
              const renderedLabel = optTooltip ? (
                <InfoTooltip
                  info={{
                    title: labelText,
                    content: [optTooltip]
                  }}
                  showIcon={false}
                >
                  {labelText}
                </InfoTooltip>
              ) : (
                labelText
              );
              return (
                <label key={`${field.name}-${idx}`} style={styles.inlineItem}>
                  <input
                    type="radio"
                    name={field.name}
                    value={String(optVal)}
                    checked={isChecked}
                    disabled={readOnly}
                    onChange={() => !readOnly && onChange(field.name, optVal)}
                  />
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: optColor || undefined }}>
                    {renderedLabel}
                  </span>
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
  if (field.showIf && !evaluateShowIf(field.showIf, values)) {
    return null;
  }

  return (
    <div style={styles.subheading}>
      {t(
        field.label,
        languageConfig?.enabled ? languageConfig.lang : "en"
      )}
    </div>
  );

    case "optional-section-toggle":
      return (
        <div style={styles.optionalSectionToggle}>
          <label style={styles.optionalSectionLabel}>
            <input
              type="checkbox"
              checked={!!value}
              disabled={readOnly}
              onChange={e => onChange(field.name, e.target.checked)}
            />
            <span>{t(field.label, languageConfig?.enabled ? languageConfig.lang : "en")}</span>
          </label>
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
      const cornerLabel = field.cornerLabel || "";
      const cornerLikeGroupHeader = field.cornerLikeGroupHeader === true;

      const flatCols = groups.flatMap(g => g.columns);
      const colCount = flatCols.length;
      const showColumnHeaders = field.showColumnHeaders !== false;

      const gridTemplate = `200px repeat(${colCount}, 1fr)`;

      return (
        <div style={styles.vaWrap}>
          <div style={{ display: "grid", gridTemplateColumns: gridTemplate }}>
            <div style={cornerLikeGroupHeader ? { ...styles.vaGroupHeader, borderRight: "1px solid #eef2f7" } : styles.vaCorner}>
              {cornerLabel}
            </div>
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

          {showColumnHeaders && (
            <div style={{ display: "grid", gridTemplateColumns: gridTemplate }}>
              <div style={styles.vaCorner} />
              {flatCols.map((c, i) => (
                <div key={i} style={styles.vaColHeader}>
                  {c.key}
                </div>
              ))}
            </div>
          )}


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
                          {col.type === "static" ? (
                            <div style={styles.vaStaticCell}>
                              {col.value || ""}
                            </div>
                          ) : col.type === "select" ? (
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
    case "input-number-range":
      return (
        <input
          min={field.min}
          max={field.max}
          type="number"
          style={styles.input}
          value={value || ""}
          readOnly={readOnly}
          placeholder={t(field.placeholder, languageConfig?.enabled ? languageConfig.lang : "en") || ""}
          onChange={e =>
            !readOnly && onChange(field.name, e.target.value)
          }
        />
      );
    case "checkbox-table-form": {
        return (
          <div style={styles.refraction12Wrapper}>
            <table style={{ width: "100%", tableLayout: "fixed", fontSize: "9px", borderCollapse: "collapse" }}>
              {/* Top header */}
              <tr>
                {field.columns.map(col => {
                  if (col.rowSpan) {
                    return (
                      <th rowSpan={col.rowSpan} style={styles.tableContentOverflow}>
                        {col.name}
                      </th>
                    )
                  } else {
                    return (
                      <th
                        key={col.name}
                        colSpan={getColSpan(col)}
                      >
                        {col.name}
                      </th>
                    )
                  }
                })}
              </tr>
              <tr>
                {field.columns.map((col) => 
                  col.groups &&
                     col.groups.map((group) => (
                      <th
                        key={col.name + group.title}
                        colSpan={group.options.length}
                        rowSpan={!group.labels ? 2 : 1}
                      >
                        {group.title}
                      </th>
                    ))
                )}
              </tr>
              <tr>
                {field.columns.map(col =>
                  col.groups &&
                    col.groups.map(group => (
                      group.labels || []
                    ).map((label, i) => (
                      <th
                        key={group.title + i}
                      >
                        {label}
                      </th>
                    )))
                )}
              </tr>
              <tbody>
                {field.rows.map(row => (
                  <tr key={row}>
                    <td style={styles.tableContentOverflow}>
                      {row}
                    </td>
                    {field.columns.map(col => 
                      col.groups && col.groups.map(group => 
                        group.options.map(option => 
                          cell(values, row, option, onChange)
                        )
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
    case "clock-marker":
      return (
        <ClockMarker
          field={field}
          values={values}
          onChange={onChange}
          readOnly={readOnly}
        />
      );

    // case "wound-assessment-inline":
    //   return <WoundAssessmentInline value={value} onChange={v => onChange(field.name, v)} />;

    case "wound-measurement-clock":
      return (
        <WoundMeasurementClock
          field={field}
          values={values}
          onChange={onChange}
          readOnly={readOnly}
        />
      );

    case "wound-location-marker":
      return (
        <WoundLocationMarker
          value={value || {}}
          onChange={(v) => onChange(field.name, v)}
          readOnly={readOnly}
          views={field.views}
        />
      );

    case "alert-box": {
      const severity = field.severity || "info"; // "info" | "warning" | "danger"
      const colors = {
        info:    { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af", icon: "ℹ️" },
        warning: { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", icon: "⚠️" },
        danger:  { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", icon: "🔴" }
      };
      const c = colors[severity] || colors.info;
      return (
        <div style={{
          background: c.bg, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.border}`,
          borderRadius: 6, padding: "10px 14px", color: c.text, fontSize: 13, fontWeight: 500,
          display: "flex", alignItems: "flex-start", gap: 8
        }}>
          <span>{c.icon}</span>
          <span>{field.message}</span>
        </div>
      );
    }
    case "wound-tracking-grid":
      return <WoundTrackingGrid value={value || []} onChange={v => onChange(field.name, v)} readOnly={readOnly} />;

    default:
      return null;
  }
}

/* ── Inline Wound Assessment embedded inside Admission Nursing ── */
function WoundAssessmentInline({ value, onChange }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const v = (value && typeof value === "object") ? value : {};
  const set = (k, val) => onChange({ ...v, [k]: val });

  return (
    <div style={{ border: "2px solid #2563eb", borderRadius: 10, marginTop: 8, overflow: "hidden" }}>
      {/* Header bar */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{
          background: "#2563eb", color: "#fff", padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none"
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14 }}>📋 Wound Assessment (WATFS)</span>
        <span style={{ fontSize: 13 }}>{collapsed ? "▼ Expand" : "▲ Collapse"}</span>
      </div>

      {!collapsed && (
        <div style={{ padding: 16, background: "#f8fafc" }}>
          <WoundAssessmentForm values={v} onChange={set} />
        </div>
      )}
    </div>
  );
}

/* Minimal self-contained wound form reusing the same table layout */
function WoundAssessmentForm({ values, onChange }) {
  // Dynamically import the standalone WoundAssessment component
  // We render it by directly using the same table-based UI
  const [WA, setWA] = React.useState(null);

  React.useEffect(() => {
    import("../Nursing/pages/WoundAssessment")
      .then(m => setWA(() => m.default))
      .catch(() => setWA(null));
  }, []);

  if (!WA) return <div style={{ color: "#94a3b8", fontSize: 13, padding: 8 }}>Loading wound assessment...</div>;

  return <WA patient={null} embeddedValues={values} onEmbeddedChange={onChange} />;
}

function WoundMeasurementClock({ field, values, onChange, readOnly }) {
  const CX = 150, CY = 150, R = 110;

  // Derived values
  const L = parseFloat(values.wound_length) || 0;
  const W = parseFloat(values.wound_width)  || 0;
  const D = parseFloat(values.wound_depth)  || 0;
  const area = L && W ? (L * W).toFixed(2) : null;
  const depthEnabled = D > 0;

  const markers = field.markers || [];
  const [activeKey, setActiveKey] = React.useState(markers[0]?.key || null);

  const hourPos = React.useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const hour = i === 0 ? 12 : i;
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const rLabel = R - 22;
    return {
      hour,
      lx: CX + rLabel * Math.cos(angle),
      ly: CY + rLabel * Math.sin(angle),
      hx: CX + (R - 6) * Math.cos(angle),
      hy: CY + (R - 6) * Math.sin(angle),
    };
  }), []);

  const getList = (key) => {
    const v = values[key];
    if (!v) return [];
    if (Array.isArray(v)) return v.map(Number);
    return [Number(v)].filter(Boolean);
  };

  const toggleHour = (hour) => {
    if (readOnly || !activeKey) return;
    const cur = getList(activeKey);
    const next = cur.includes(hour) ? cur.filter(h => h !== hour) : [...cur, hour];
    onChange(activeKey, next.length ? next : null);
  };

  const removeHour = (key, hour) => {
    const next = getList(key).filter(h => h !== hour);
    onChange(key, next.length ? next : null);
  };

  const hourDotMap = {};
  markers.forEach(m => getList(m.key).forEach(h => {
    if (!hourDotMap[h]) hourDotMap[h] = [];
    hourDotMap[h].push(m);
  }));

  const activeMarker = markers.find(m => m.key === activeKey);
  const sinusMarkers     = markers.filter(m => m.key.startsWith("sinus"));
  const undermineMarkers = markers.filter(m => m.key.startsWith("undermining"));

  const inp = (name, placeholder) => (
    <input
      type="number" min="0" step="0.1"
      value={values[name] || ""}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={e => !readOnly && onChange(name, e.target.value)}
      style={{
        width: 72, padding: "5px 8px", border: "1.5px solid #cbd5e1",
        borderRadius: 6, fontSize: 13, textAlign: "center",
        background: readOnly ? "#f8fafc" : "#fff", outline: "none"
      }}
    />
  );

  return (
    <div style={{
      background: "#f8fafc", border: "1px solid #e2e8f0",
      borderRadius: 14, padding: 20, display: "flex",
      gap: 28, flexWrap: "wrap", alignItems: "flex-start"
    }}>

      {/* ── LEFT: Clock SVG ── */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8, letterSpacing: 0.3 }}>
          Wound Measurements in cm
        </div>
        <svg viewBox="0 0 300 330" width={320} height={330}
          style={{ display: "block", cursor: readOnly ? "default" : "crosshair" }}>

          <circle cx={CX} cy={CY} r={R + 4} fill="#e2e8f0" />
          <circle cx={CX} cy={CY} r={R} fill="white" stroke="#94a3b8" strokeWidth="2.5" />

          {/* LENGTH axis 12→6 */}
          <line x1={CX} y1={CY - R + 12} x2={CX} y2={CY + R - 12}
            stroke="#2563eb" strokeWidth="2" strokeDasharray="7 4" opacity="0.55" />
          <text x={CX - 8} y={CY - R + 26} textAnchor="end" fontSize={11} fill="#2563eb" fontWeight="800" fontFamily="Arial">L</text>
          <text x={CX - 8} y={CY + R - 14} textAnchor="end" fontSize={11} fill="#2563eb" fontWeight="800" fontFamily="Arial">L</text>

          {/* WIDTH axis 3→9 */}
          <line x1={CX - R + 12} y1={CY} x2={CX + R - 12} y2={CY}
            stroke="#16a34a" strokeWidth="2" strokeDasharray="7 4" opacity="0.55" />
          <text x={CX - R + 20} y={CY - 7} textAnchor="middle" fontSize={11} fill="#16a34a" fontWeight="800" fontFamily="Arial">W</text>
          <text x={CX + R - 20} y={CY - 7} textAnchor="middle" fontSize={11} fill="#16a34a" fontWeight="800" fontFamily="Arial">W</text>

          {/* Ticks */}
          {hourPos.map(({ hour }) => {
            const angle = ((hour === 12 ? 0 : hour) * 30 - 90) * (Math.PI / 180);
            const isMajor = hour % 3 === 0;
            const r1 = R, r2 = isMajor ? R - 14 : R - 7;
            return (
              <line key={hour}
                x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
                x2={CX + r2 * Math.cos(angle)} y2={CY + r2 * Math.sin(angle)}
                stroke={isMajor ? "#475569" : "#94a3b8"} strokeWidth={isMajor ? 2.5 : 1.5} />
            );
          })}

          {/* Hour numbers */}
          {hourPos.map(({ hour, lx, ly }) => (
            <text key={hour} x={lx} y={ly + 5} textAnchor="middle"
              fontSize={hour % 3 === 0 ? 16 : 12}
              fontWeight={hour % 3 === 0 ? "700" : "400"}
              fontFamily="Arial" fill={hour % 3 === 0 ? "#1e293b" : "#64748b"}>
              {hour}
            </text>
          ))}

          <circle cx={CX} cy={CY} r={4} fill="#94a3b8" />

          <text x={CX} y={20} textAnchor="middle" fontSize={13} fontFamily="Arial" fill="#64748b" fontStyle="italic">Head</text>
          <text x={CX} y={320} textAnchor="middle" fontSize={13} fontFamily="Arial" fill="#64748b" fontStyle="italic">Toe</text>

          {/* Marker dots */}
          {hourPos.map(({ hour, hx, hy }) => {
            const dots = hourDotMap[hour] || [];
            const isActiveSel = getList(activeKey).includes(hour);
            return (
              <g key={hour} onClick={() => toggleHour(hour)} style={{ cursor: readOnly ? "default" : "pointer" }}>
                <circle cx={hx} cy={hy} r={16} fill="transparent" />
                {!readOnly && isActiveSel && (
                  <circle cx={hx} cy={hy} r={14} fill="none"
                    stroke={activeMarker?.color || "#3b82f6"} strokeWidth={2}
                    strokeDasharray="4 2" opacity={0.7} />
                )}
                {dots.map((m, di) => (
                  <circle key={m.key}
                    cx={hx + (di - (dots.length - 1) / 2) * 9}
                    cy={hy} r={8}
                    fill={m.color} stroke="white" strokeWidth={2} opacity={0.93} />
                ))}
                {dots.map((m, di) => (
                  <text key={m.key + "t"}
                    x={hx + (di - (dots.length - 1) / 2) * 9} y={hy + 4}
                    textAnchor="middle" fontSize={7} fontWeight="700"
                    fontFamily="Arial" fill="white">
                    {m.label.replace(/[^A-Z0-9]/gi, "").slice(0, 2).toUpperCase()}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>

        <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11, color: "#64748b" }}>
          <span><span style={{ color: "#2563eb", fontWeight: 700 }}>─ ─ L</span> = 12→6 (Head→Toe)</span>
          <span><span style={{ color: "#16a34a", fontWeight: 700 }}>─ ─ W</span> = 3→9</span>
        </div>
        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
          Click clock to mark sinus/undermining positions
        </div>
      </div>

      {/* ── RIGHT: Inputs + Markers ── */}
      <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Core Dimensions
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { name: "wound_length", label: "Length", hint: "12→6", color: "#2563eb" },
              { name: "wound_width",  label: "Width",  hint: "3→9",  color: "#16a34a" },
              { name: "wound_depth",  label: "Depth",  hint: "deepest", color: "#7c3aed" }
            ].map(f => (
              <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: f.color }}>
                  {f.label} <span style={{ fontWeight: 400, color: "#94a3b8" }}>({f.hint})</span>
                </label>
                {inp(f.name, "cm")}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, padding: "6px 12px", fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>
              Area = {area ? `${area} cm²` : "L × W"}
            </div>
            {area && D > 0 && (
              <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 7, padding: "6px 12px", fontSize: 12, color: "#6d28d9", fontWeight: 600 }}>
                Vol ≈ {(L * W * D * 0.327).toFixed(2)} cm³
              </div>
            )}
          </div>
        </div>

        {[
          { title: "B. Sinus Tracts", list: sinusMarkers },
          { title: "C. Undermining",  list: undermineMarkers }
        ].map(({ title, list }) => (
          <div key={title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {title} {!depthEnabled && <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "none" }}>(enter Depth to enable)</span>}
            </div>
            {list.map((m, i) => {
              const depthKey = m.key.replace("_clock", "_depth");
              const positions = getList(m.key);
              return (
                <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < list.length - 1 ? 10 : 0 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: m.color, flexShrink: 0, boxShadow: `0 0 0 2px ${m.color}44` }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", minWidth: 90 }}>{m.label}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>Depth (cm)</span>
                    {inp(depthKey, "cm")}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>Clock positions</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, minHeight: 28, alignItems: "center" }}>
                      {positions.length === 0
                        ? <span style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", border: "1px dashed #cbd5e1", borderRadius: 6, padding: "2px 8px" }}>click clock to mark</span>
                        : positions.sort((a, b) => a - b).map(h => (
                          <span key={h} style={{ background: m.color, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, boxShadow: `0 1px 4px ${m.color}66` }}>
                            {h} o'clock
                            {!readOnly && (
                              <button type="button" onClick={() => removeHour(m.key, h)}
                                style={{ background: "rgba(255,255,255,0.35)", border: "none", borderRadius: "50%", width: 14, height: 14, cursor: "pointer", color: "#fff", fontSize: 9, padding: 0, lineHeight: 1 }}>✕</button>
                            )}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Active marker for clock clicks:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {markers.map(m => {
              const isActive = activeKey === m.key;
              return (
                <button key={m.key} type="button" onClick={() => !readOnly && setActiveKey(m.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20,
                    cursor: readOnly ? "default" : "pointer",
                    border: `2px solid ${isActive ? m.color : "#e2e8f0"}`,
                    background: isActive ? `${m.color}18` : "#fafafa",
                    fontSize: 12, fontWeight: isActive ? 700 : 500, color: "#334155",
                    transition: "all 0.15s", boxShadow: isActive ? `0 0 0 3px ${m.color}22` : "none"
                  }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color }} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


function ClockMarker({ field, values, onChange, readOnly }) {
  const CX = 100, CY = 108, R_FACE = 78, R_LABEL = 60, R_HIT = 72;

  // Precompute (x,y) for each hour on the label ring
  const hourPositions = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i === 0 ? 12 : i;
      const angle = (i * 30 - 90) * (Math.PI / 180);
      return {
        hour,
        lx: CX + R_LABEL * Math.cos(angle),
        ly: CY + R_LABEL * Math.sin(angle),
        hx: CX + R_HIT * Math.cos(angle),
        hy: CY + R_HIT * Math.sin(angle),
      };
    });
  }, []);

  const markers = field.markers || [];
  const [activeKey, setActiveKey] = React.useState(markers[0]?.key || null);

  // value stored as { sinus1_clock: [3,4], undermining1_clock: [9], ... }
  const getList = (key) => {
    const v = values[key];
    if (!v) return [];
    if (Array.isArray(v)) return v.map(Number);
    return [Number(v)].filter(Boolean);
  };

  const toggleHour = (hour) => {
    if (readOnly || !activeKey) return;
    const current = getList(activeKey);
    const next = current.includes(hour)
      ? current.filter(h => h !== hour)
      : [...current, hour];
    onChange(activeKey, next.length ? next : null);
  };

  const removeHour = (key, hour) => {
    const next = getList(key).filter(h => h !== hour);
    onChange(key, next.length ? next : null);
  };

  // Build a map: hour -> list of {color, label, key} for rendering dots
  const hourDotMap = {};
  markers.forEach(m => {
    getList(m.key).forEach(h => {
      if (!hourDotMap[h]) hourDotMap[h] = [];
      hourDotMap[h].push(m);
    });
  });

  const activeMarker = markers.find(m => m.key === activeKey);

  return (
    <div style={{
      display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap",
      background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12,
      padding: 20
    }}>
      {/* ── Clock SVG ── */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginBottom: 4, fontStyle: "italic" }}>
          Click positions to mark
        </div>
        <svg viewBox="0 0 200 230" width={210} height={230}
          style={{ display: "block", cursor: readOnly ? "default" : "crosshair" }}>

          {/* Shadow */}
          <circle cx={CX} cy={CY} r={R_FACE + 2} fill="#e2e8f0" />
          {/* Face */}
          <circle cx={CX} cy={CY} r={R_FACE} fill="white" stroke="#94a3b8" strokeWidth="2" />

          {/* Tick marks */}
          {hourPositions.map(({ hour, lx, ly }) => {
            const angle = ((hour === 12 ? 0 : hour) * 30 - 90) * (Math.PI / 180);
            const isMajor = hour % 3 === 0;
            const r1 = R_FACE - 2, r2 = isMajor ? R_FACE - 10 : R_FACE - 6;
            return (
              <line key={hour}
                x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
                x2={CX + r2 * Math.cos(angle)} y2={CY + r2 * Math.sin(angle)}
                stroke={isMajor ? "#475569" : "#94a3b8"} strokeWidth={isMajor ? 2 : 1} />
            );
          })}

          {/* Hour numbers */}
          {hourPositions.map(({ hour, lx, ly }) => (
            <text key={hour} x={lx} y={ly + 4} textAnchor="middle"
              fontSize={hour % 3 === 0 ? 13 : 10}
              fontWeight={hour % 3 === 0 ? "700" : "400"}
              fontFamily="Arial, sans-serif"
              fill={hour % 3 === 0 ? "#1e293b" : "#475569"}>
              {hour}
            </text>
          ))}

          {/* Center dot */}
          <circle cx={CX} cy={CY} r={3} fill="#94a3b8" />

          {/* Head / Toe labels */}
          <text x={CX} y={14} textAnchor="middle" fontSize={10} fontFamily="Arial" fill="#64748b" fontStyle="italic">Head</text>
          <text x={CX} y={226} textAnchor="middle" fontSize={10} fontFamily="Arial" fill="#64748b" fontStyle="italic">Toe</text>

          {/* Marker dots on clock */}
          {hourPositions.map(({ hour, hx, hy }) => {
            const dots = hourDotMap[hour] || [];
            const isActiveSelected = getList(activeKey).includes(hour);
            return (
              <g key={hour} onClick={() => toggleHour(hour)}>
                {/* Invisible hit area */}
                <circle cx={hx} cy={hy} r={12} fill="transparent" />
                {/* Hover ring for active marker */}
                {!readOnly && isActiveSelected && (
                  <circle cx={hx} cy={hy} r={11} fill="none"
                    stroke={activeMarker?.color || "#3b82f6"} strokeWidth={1.5} strokeDasharray="3 2" opacity={0.6} />
                )}
                {/* Stacked colored dots */}
                {dots.map((m, di) => (
                  <circle key={m.key}
                    cx={hx + (di - (dots.length - 1) / 2) * 6}
                    cy={hy}
                    r={6}
                    fill={m.color}
                    stroke="white" strokeWidth={1.5}
                    opacity={0.92}
                  />
                ))}
                {/* Dot initials */}
                {dots.map((m, di) => (
                  <text key={m.key + "_t"}
                    x={hx + (di - (dots.length - 1) / 2) * 6}
                    y={hy + 3.5}
                    textAnchor="middle" fontSize={6} fontWeight="700"
                    fontFamily="Arial" fill="white">
                    {m.label.replace(/[^A-Z0-9]/g, "").slice(0, 2)}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
        <div style={{ fontSize: 9, color: "#94a3b8", textAlign: "center", marginTop: 2, lineHeight: 1.5 }}>
          12=Head · 6=Toe · 3=Pt. Right · 9=Pt. Left
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 2 }}>
          Active marker — click clock to place:
        </div>

        {markers.map(m => {
          const list = getList(m.key);
          const isActive = activeKey === m.key;
          return (
            <div
              key={m.key}
              onClick={() => !readOnly && setActiveKey(m.key)}
              style={{
                borderRadius: 8,
                border: `2px solid ${isActive ? m.color : "#e2e8f0"}`,
                background: isActive ? `${m.color}12` : "#fff",
                padding: "10px 12px",
                cursor: readOnly ? "default" : "pointer",
                transition: "border-color 0.15s, background 0.15s",
                boxShadow: isActive ? `0 0 0 3px ${m.color}22` : "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: list.length ? 8 : 0 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: "50%",
                  background: m.color, flexShrink: 0,
                  boxShadow: isActive ? `0 0 0 3px ${m.color}44` : "none"
                }} />
                <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: "#1e293b" }}>
                  {m.label}
                </span>
                {isActive && (
                  <span style={{
                    marginLeft: "auto", fontSize: 10, background: m.color,
                    color: "#fff", borderRadius: 4, padding: "1px 7px", fontWeight: 600
                  }}>Active</span>
                )}
              </div>

              {/* Position chips */}
              {list.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {list.sort((a, b) => a - b).map(h => (
                    <span key={h} style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      background: m.color, color: "#fff",
                      borderRadius: 20, padding: "2px 9px 2px 9px",
                      fontSize: 11, fontWeight: 600
                    }}>
                      {h} o'clock
                      {!readOnly && (
                        <button type="button"
                          onClick={e => { e.stopPropagation(); removeHour(m.key, h); }}
                          style={{
                            background: "rgba(255,255,255,0.3)", border: "none",
                            borderRadius: "50%", width: 14, height: 14,
                            cursor: "pointer", color: "#fff", fontSize: 9,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: 0, lineHeight: 1
                          }}>✕</button>
                      )}
                    </span>
                  ))}
                </div>
              )}
              {list.length === 0 && (
                <div style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}>No positions marked</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WoundTrackingGrid({ value, onChange, readOnly }) {
  const data  = (value && typeof value === "object" && !Array.isArray(value)) ? value : {};
  const month = data.month || "";
  const days  = data.days  || {};

  const daysInMonth = React.useMemo(() => {
    if (!month) return 0;
    const [y, m] = month.split("-").map(Number);
    return new Date(y, m, 0).getDate();
  }, [month]);

  const dayNums = daysInMonth > 0 ? Array.from({ length: daysInMonth }, (_, i) => i + 1) : [];

  const setMonth = (val) => onChange({ month: val, days: {} });

  const updateDay = (d, key, val) => {
    const prev = days[d] || {};
    onChange({ ...data, days: { ...days, [d]: { ...prev, [key]: val } } });
  };

  const toggleCheck = (d, key) => updateDay(d, key, !(days[d]?.[key]));

  const setRadio = (d, group, val) => {
    const prev = days[d] || {};
    const cleared = Object.fromEntries(Object.entries(prev).filter(([k]) => !k.startsWith(group + "__")));
    onChange({ ...data, days: { ...days, [d]: { ...cleared, [`${group}__${val}`]: true } } });
  };

  const isRadioSet = (d, group, val) => !!(days[d]?.[`${group}__${val}`]);

  const EXUDATE_AMOUNT_OPTS = ["None", "Scant/small", "Moderate", "Large/copious"];
  const EXUDATE_TYPE_OPTS   = ["Serous", "Sanguineous", "Purulent", "Other:"];
  const WOUND_EDGE_OPTS = [
    { label: "Attached",          sub: 'flush w/ wound bed or "sloping edge"' },
    { label: "Non-Attached",      sub: 'edge appears as a "cliff"' },
    { label: "Demarcated",        sub: "edges clearly seen" },
    { label: "Diffuse",           sub: "edges not clear" },
    { label: "Rolled",            sub: "edge curled under" },
    { label: "Epithelialization", sub: "" },
  ];
  const PERI_SKIN_OPTS = [
    { label: "Intact",                         sub: "" },
    { label: "Erythema (reddened) in cm",      sub: "" },
    { label: "Indurated",                      sub: "firmness around wound in cm" },
    { label: "Macerated (white, waterlogged)", sub: "" },
    { label: "Excoriated/Denuded",             sub: "superficial loss of tissue" },
    { label: "Callused",                       sub: "" },
    { label: "Fragile",                        sub: "" },
    { label: "Other:",                         sub: "" },
  ];

  const thCat  = { border: "1px solid #b2c8d8", padding: "6px 10px", fontSize: 11, fontWeight: 700, background: "#1a6b8a", color: "#fff", verticalAlign: "middle", textAlign: "left", minWidth: 130, maxWidth: 160, position: "sticky", left: 0, zIndex: 3 };
  const thSub  = { border: "1px solid #b2c8d8", padding: "5px 10px", fontSize: 10, background: "#e8f4f8", color: "#0d3d52", verticalAlign: "middle", minWidth: 180, maxWidth: 220, fontWeight: 600, position: "sticky", left: 130, zIndex: 3 };
  const thDay  = { border: "1px solid #b2c8d8", padding: "4px 2px", fontSize: 11, fontWeight: 700, background: "#2a8aad", color: "#fff", textAlign: "center", minWidth: 36, width: 36 };
  const tdCat  = { border: "1px solid #b2c8d8", padding: "5px 10px", fontSize: 11, fontWeight: 700, background: "#d6eaf3", color: "#0d3d52", verticalAlign: "top", position: "sticky", left: 0, zIndex: 2 };
  const tdSub  = { border: "1px solid #b2c8d8", padding: "4px 10px", fontSize: 10, background: "#f7fbfd", color: "#1e293b", verticalAlign: "middle", position: "sticky", left: 130, zIndex: 2 };
  const tdCell = { border: "1px solid #b2c8d8", padding: "2px", textAlign: "center", background: "#fff", verticalAlign: "middle" };

  const Chk = ({ d, field }) => (
    <input type="checkbox" checked={!!(days[d]?.[field])} disabled={readOnly}
      onChange={() => !readOnly && toggleCheck(d, field)}
      style={{ width: 13, height: 13, cursor: readOnly ? "default" : "pointer", accentColor: "#2563eb" }} />
  );

  const Radio = ({ d, group, val }) => (
    <input type="radio" checked={isRadioSet(d, group, val)} disabled={readOnly}
      name={`${group}_day${d}`}
      onChange={() => !readOnly && setRadio(d, group, val)}
      style={{ width: 13, height: 13, cursor: readOnly ? "default" : "pointer", accentColor: "#2563eb" }} />
  );

  const PainCell = ({ d }) => {
    const v = days[d]?.wound_pain || "";
    const n = parseInt(v) || 0;
    const color = n >= 7 ? "#ef4444" : n >= 4 ? "#f59e0b" : n > 0 ? "#22c55e" : "#94a3b8";
    return (
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 28 }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.1 }} viewBox="0 0 32 32" preserveAspectRatio="none">
          <line x1="0" y1="32" x2="32" y2="0" stroke="#475569" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="20" y2="0" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="32" x2="32" y2="12" stroke="#475569" strokeWidth="1.5" />
        </svg>
        <input type="number" min={0} max={10} value={v} disabled={readOnly}
          onChange={e => !readOnly && updateDay(d, "wound_pain", e.target.value)}
          style={{ width: 28, fontSize: 10, border: `1px solid ${color}`, borderRadius: 3,
            textAlign: "center", padding: "1px", color, fontWeight: 700,
            background: v ? `${color}12` : "#fff", position: "relative", zIndex: 1 }}
          placeholder="/10" />
      </div>
    );
  };

  const monthLabel = month
    ? new Date(month + "-01").toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "";

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <label style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>Month / Year:</label>
        <input type="month" value={month} disabled={readOnly}
          onChange={e => !readOnly && setMonth(e.target.value)}
          style={{ fontSize: 13, padding: "5px 10px", border: "1.5px solid #cbd5e1", borderRadius: 6 }} />
        {month && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>
            {monthLabel} — {daysInMonth} days
          </span>
        )}
      </div>

      {!month && (
        <div style={{ color: "#94a3b8", fontSize: 13, fontStyle: "italic" }}>
          Select a Month / Year above — daily columns will auto-generate.
        </div>
      )}

      {month && daysInMonth > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", fontSize: 11, tableLayout: "auto" }}>
            <thead>
              <tr>
                <th style={{ ...thCat, background: "#0d3d52" }}>Wound<br />Location:</th>
                <th style={{ ...thSub, background: "#1a6b8a", color: "#fff", fontWeight: 700 }}>Month/Year &nbsp;&nbsp;&nbsp; Day</th>
                {dayNums.map(d => <th key={d} style={thDay}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdCat, background: "#e8f4f8", fontWeight: 600, fontSize: 10 }}></td>
                <td style={{ ...tdSub, fontSize: 10, color: "#0d3d52", fontWeight: 600 }}>Time of dressing</td>
                {dayNums.map(d => (
                  <td key={d} style={{ ...tdCell, padding: "2px 1px", minWidth: 60 }}>
                    <input
                      type="time"
                      value={days[d]?.time || ""}
                      disabled={readOnly}
                      onChange={e => !readOnly && updateDay(d, "time", e.target.value)}
                      style={{
                        width: 58, fontSize: 10, border: "1px solid #b2c8d8", borderRadius: 3,
                        background: "#fff", color: "#0d3d52", padding: "2px 3px",
                        cursor: readOnly ? "default" : "pointer"
                      }}
                    />
                  </td>
                ))}
              </tr>
              {EXUDATE_AMOUNT_OPTS.map((opt, oi) => (
                <tr key={`ea-${oi}`}>
                  {oi === 0 && <td rowSpan={EXUDATE_AMOUNT_OPTS.length} style={tdCat}>Exudate Amount<br /><span style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>[✓] one</span></td>}
                  <td style={tdSub}>{opt}</td>
                  {dayNums.map(d => <td key={d} style={tdCell}><Radio d={d} group="exudate_amount" val={opt} /></td>)}
                </tr>
              ))}
              {EXUDATE_TYPE_OPTS.map((opt, oi) => (
                <tr key={`et-${oi}`}>
                  {oi === 0 && <td rowSpan={EXUDATE_TYPE_OPTS.length} style={tdCat}>Exudate Type<br /><span style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>[✓] all that apply</span></td>}
                  <td style={tdSub}>{opt}</td>
                  {dayNums.map(d => <td key={d} style={tdCell}><Chk d={d} field={`exudate_type__${opt}`} /></td>)}
                </tr>
              ))}
              <tr>
                <td style={tdCat}>Odour</td>
                <td style={tdSub}>Odour present after cleansing<br /><span style={{ fontSize: 9 }}>Yes or No</span></td>
                {dayNums.map(d => (
                  <td key={d} style={tdCell}>
                    <select value={days[d]?.odour || ""} disabled={readOnly}
                      onChange={e => !readOnly && updateDay(d, "odour", e.target.value)}
                      style={{ width: 30, fontSize: 9, border: "1px solid #ccc", borderRadius: 2, padding: "1px" }}>
                      <option value="">—</option>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </td>
                ))}
              </tr>
              {WOUND_EDGE_OPTS.map((opt, oi) => (
                <tr key={`we-${oi}`}>
                  {oi === 0 && <td rowSpan={WOUND_EDGE_OPTS.length} style={tdCat}>Wound Edge<br /><span style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>[✓] all that apply</span></td>}
                  <td style={tdSub}><span style={{ fontWeight: 600 }}>{opt.label}</span>{opt.sub && <span style={{ fontSize: 9, color: "#64748b", display: "block" }}>{opt.sub}</span>}</td>
                  {dayNums.map(d => <td key={d} style={tdCell}><Chk d={d} field={`wound_edge__${opt.label}`} /></td>)}
                </tr>
              ))}
              {PERI_SKIN_OPTS.map((opt, oi) => (
                <tr key={`ps-${oi}`}>
                  {oi === 0 && <td rowSpan={PERI_SKIN_OPTS.length} style={tdCat}>Peri-wound Skin<br /><span style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>[✓] all that apply</span></td>}
                  <td style={tdSub}><span style={{ fontWeight: 600 }}>{opt.label}</span>{opt.sub && <span style={{ fontSize: 9, color: "#64748b", display: "block" }}>{opt.sub}</span>}</td>
                  {dayNums.map(d => <td key={d} style={tdCell}><Chk d={d} field={`peri_skin__${opt.label}`} /></td>)}
                </tr>
              ))}
              <tr>
                <td style={tdCat}>Wound Pain<br /><span style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>(10 = worst)</span></td>
                <td style={{ ...tdSub, fontSize: 9, color: "#475569" }}>Scored from 10 point analogue Pain Scale. See Pain Assessment for details</td>
                {dayNums.map(d => <td key={d} style={{ ...tdCell, padding: "2px 1px" }}><PainCell d={d} /></td>)}
              </tr>
              <tr>
                <td style={tdCat}>Packing Count</td>
                <td style={{ ...tdSub, fontSize: 9, color: "#475569" }}>Any depth 1cm or greater, Out count # packing pieces in</td>
                {dayNums.map(d => (
                  <td key={d} style={tdCell}>
                    <input type="text" value={days[d]?.packing_count || ""} disabled={readOnly}
                      onChange={e => !readOnly && updateDay(d, "packing_count", e.target.value)}
                      style={{ width: 28, fontSize: 9, border: "1px solid #ccc", borderRadius: 2, padding: "1px", textAlign: "center" }} placeholder="—" />
                  </td>
                ))}
              </tr>
              <tr>
                <td style={tdCat}>Treatment</td>
                <td style={{ ...tdSub, fontSize: 9, color: "#475569" }}>Treatment done as per Treatment Plan</td>
                {dayNums.map(d => <td key={d} style={tdCell}><Chk d={d} field="treatment_done" /></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
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
  const span = max - min;

  // support both {from,to} and {min,max} range shapes
  const normalised = ranges.map(r => ({
    ...r,
    from: r.from ?? r.min ?? min,
    to:   r.to   ?? r.max ?? max,
  }));

  const gradient = normalised.length > 0
    ? `linear-gradient(to right, ${normalised.map(r =>
        `${r.color} ${((r.from - min) / span) * 100}% ${((r.to - min) / span) * 100}%`
      ).join(",")})`
    : "linear-gradient(to right, #9ca3af, #9ca3af)";

  const activeRange = normalised.find(r => Number(value) >= r.from && Number(value) <= r.to);

  return (
    <div style={{ marginTop: 10 }}>
      {/* Colour band labels */}
      {normalised.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
          {normalised.map(r => {
            const isActive = activeRange?.label === r.label;
            return (
              <div key={r.label} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: isActive ? 700 : 500,
                background: isActive ? r.color : `${r.color}22`,
                color: isActive ? "#fff" : r.color,
                border: `1.5px solid ${r.color}`,
                transition: "all 0.15s"
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, display: "inline-block" }} />
                {r.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Number ticks */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginBottom: 2 }}>
        {Array.from({ length: Math.floor(span / step) + 1 }, (_, i) => min + i * step).map(n => (
          <span key={n} style={{ fontWeight: Number(value) === n ? 700 : 400, color: activeRange?.color || "#64748b" }}>{n}</span>
        ))}
      </div>

      {/* Slider track */}
      <div style={{ position: "relative" }}>
        <input
          type="range" min={min} max={max} step={step}
          value={value} disabled={readOnly}
          onChange={e => onChange(field.name, Number(e.target.value))}
          style={{
            width: "100%", appearance: "none", WebkitAppearance: "none",
            height: 10, borderRadius: 999, background: gradient,
            outline: "none", cursor: readOnly ? "default" : "pointer"
          }}
        />
      </div>

      {/* Selected value badge */}
      {showValue && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700,
            background: activeRange ? activeRange.color : "#e2e8f0",
            color: activeRange ? "#fff" : "#334155"
          }}>
            Score: {value}
            {activeRange && <span style={{ fontWeight: 400, fontSize: 11 }}>— {activeRange.label}</span>}
          </div>
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

  optionalSectionToggle: {
    marginTop: 16,
    marginBottom: 10
  },

  optionalSectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    color: "#0F172A"
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
    // gap: "0 16px", // Horizontal gap between columns
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
  inputStyle: {
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
  infoWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    marginLeft: 6,
    cursor: "pointer"
  },

  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1
  },

  tooltipCard: {
    position: "absolute",
    top: "28px",
    left: 0,
    background: "#ffffff",
    color: "#0f172a",
    padding: "12px 14px",
    borderRadius: 8,
    width: 260,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(15,23,42,0.15)",
    zIndex: 100,
    fontSize: 13
  },

  tooltipArrow: {
    position: "absolute",
    top: -6,
    left: 12,
    width: 12,
    height: 12,
    background: "#fff",
    borderLeft: "1px solid #e5e7eb",
    borderTop: "1px solid #e5e7eb",
    transform: "rotate(45deg)"
  },

  tooltipTitle: {
    fontWeight: 700,
    marginBottom: 6,
    fontSize: 13
  },

  tooltipList: {
    paddingLeft: 16,
    margin: 0,
    lineHeight: 1.5
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
  vaStaticCell: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    fontSize: 14,
    fontWeight: 700,
    padding: "0 10px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
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

  checkedBox: {
    width:"50px",
    height:"45px",
    textAlign:"center",
    verticalAlign:"middle",
    cursor:"pointer",
    position:"relative"
  },
  hiddenCheckbox: {
    display:"none"
  },

  checkboxTick: {
    fontSize:"26px",
    fontWeight:"bold",
    color:"black"
  },
  tableContentOverflow: { 
    wordBreak: "break-word", 
    padding: "4px"
  }


};
