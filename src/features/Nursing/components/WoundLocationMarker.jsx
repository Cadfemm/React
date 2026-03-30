import React, { useRef, useState } from "react";

const DEFAULT_BODY_VIEWS = [
  { key: "body",  label: "Body (Front/Back)", src: "/wound-body.png" },
  { key: "hands", label: "Hands",             src: "/wound-hands.png" },
  { key: "feet",  label: "Feet",              src: "/wound-feet.png" },
];

const PIN_COLOR = "#ef4444";

/**
 * value shape: { [viewKey]: [ { id, x, y, label } ] }
 * x, y are percentages (0–100) relative to the image
 *
 * views prop (optional): array of { key, label, src } — comes from schema field definition.
 * Falls back to DEFAULT_BODY_VIEWS if not provided.
 */
const MAX_PIN_CHARS = 4;

function PinMarker({ pin, color, readOnly, onRemove }) {
  const [hovered, setHovered] = useState(false);
  const truncated = pin.label.length > MAX_PIN_CHARS
    ? pin.label.slice(0, MAX_PIN_CHARS) + "…"
    : pin.label;
  const needsTooltip = pin.label.length > MAX_PIN_CHARS;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -100%)",
        pointerEvents: "auto",
        zIndex: hovered ? 10 : 1
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            background: color,
            color: "#fff",
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)",
            width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700,
            boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            cursor: readOnly ? "default" : "pointer",
            overflow: "hidden"
          }}
          onClick={(e) => { e.stopPropagation(); if (!readOnly) onRemove(); }}
        >
          <span style={{ transform: "rotate(45deg)", whiteSpace: "nowrap" }}>{truncated}</span>
        </div>
      </div>

      {/* Tooltip for long labels */}
      {needsTooltip && hovered && (
        <div style={{
          position: "absolute",
          bottom: "110%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1e293b",
          color: "#fff",
          fontSize: 11,
          fontWeight: 500,
          padding: "4px 8px",
          borderRadius: 5,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          zIndex: 20
        }}>
          {pin.label}
        </div>
      )}
    </div>
  );
}

export default function WoundLocationMarker({ value = {}, onChange, readOnly = false, views }) {
  const BODY_VIEWS = (views && views.length > 0) ? views : DEFAULT_BODY_VIEWS;
  const [activeView, setActiveView] = useState(BODY_VIEWS[0].key);
  const imgRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(500);

  const viewData = BODY_VIEWS.find(v => v.key === activeView) || BODY_VIEWS[0];
  const pins = value[activeView] || [];

  // Recalculate rows whenever image renders or view changes
  const ITEM_HEIGHT = 46; // chip height + gap
  const rowsPerCol = Math.max(1, Math.floor(imgHeight / ITEM_HEIGHT));

  const addPin = (e) => {
    if (readOnly) return;
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    const newPin = { id, x, y, label: `W${(pins.length + 1)}` };
    const updated = { ...value, [activeView]: [...pins, newPin] };
    onChange(updated);
  };

  const removePin = (id) => {
    const updated = { ...value, [activeView]: pins.filter(p => p.id !== id) };
    onChange(updated);
  };

  const updateLabel = (id, label) => {
    const updated = {
      ...value,
      [activeView]: pins.map(p => p.id === id ? { ...p, label } : p)
    };
    onChange(updated);
  };

  const clearAll = () => {
    onChange({ ...value, [activeView]: [] });
  };

  const totalPins = Object.values(value).flat().length;

  return (
    <div style={{ fontFamily: "Inter, system-ui" }}>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {BODY_VIEWS.map(v => (
          <button
            key={v.key}
            type="button"
            onClick={() => setActiveView(v.key)}
            style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: "pointer", border: "1px solid",
              background: activeView === v.key ? "#1e40af" : "#f1f5f9",
              color: activeView === v.key ? "#fff" : "#374151",
              borderColor: activeView === v.key ? "#1e40af" : "#d1d5db"
            }}
          >
            {v.label}
            {(value[v.key] || []).length > 0 && (
              <span style={{
                marginLeft: 6, background: "#ef4444", color: "#fff",
                borderRadius: 999, padding: "1px 6px", fontSize: 10
              }}>
                {(value[v.key] || []).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Image + pins */}
      <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
          <img
            ref={imgRef}
            src={viewData.src}
            alt={viewData.label}
            onClick={addPin}
            onLoad={() => {
              if (imgRef.current) setImgHeight(imgRef.current.getBoundingClientRect().height);
            }}
            style={{
              width: 500, height: "auto", display: "block",
              border: "1px solid #e5e7eb", borderRadius: 8,
              cursor: readOnly ? "default" : "crosshair",
              userSelect: "none"
            }}
            draggable={false}
          />

          {/* Render pins */}
          {pins.map((pin, i) => (
            <PinMarker
              key={pin.id}
              pin={pin}
              color={PIN_COLOR}
              readOnly={readOnly}
              onRemove={() => removePin(pin.id)}
            />
          ))}

          {!readOnly && (
            <div style={{ marginTop: 6, fontSize: 11, color: "#6b7280" }}>
              Click on image to mark wound location. Click pin to remove.
            </div>
          )}
        </div>

        {/* Pin legend / label editor */}
        {pins.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a", marginBottom: 2 }}>
              Marked Wounds
            </div>
            <div style={{
              display: "grid",
              gridTemplateRows: `repeat(${rowsPerCol}, auto)`,
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(160px, auto)",
              gap: 8,
            }}>
              {pins.map((pin) => (
                <div key={pin.id} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#f8fafc", border: "1px solid #e5e7eb",
                  borderRadius: 8, padding: "8px 12px"
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: PIN_COLOR, flexShrink: 0
                  }} />
                  {readOnly ? (
                    <span style={{ fontSize: 12, color: "#111827" }}>{pin.label}</span>
                  ) : (
                    <input
                      value={pin.label}
                      onChange={e => updateLabel(pin.id, e.target.value)}
                      style={{
                        border: "1px solid #d1d5db", borderRadius: 4,
                        padding: "3px 8px", fontSize: 13, width: 100,
                        color: "#111827"
                      }}
                      placeholder="Label"
                    />
                  )}
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => removePin(pin.id)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "#ef4444", fontSize: 13, padding: 0, lineHeight: 1
                      }}
                    >✕</button>
                  )}
                </div>
              ))}
            </div>
            {!readOnly && (
              <button
                type="button"
                onClick={clearAll}
                style={{
                  marginTop: 4, fontSize: 11, color: "#6b7280",
                  background: "none", border: "none", cursor: "pointer",
                  textDecoration: "underline", padding: 0, textAlign: "left"
                }}
              >
                Clear all on this view
              </button>
            )}
          </div>
        )}
      </div>

      {totalPins > 0 && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
          Total wound markers: {totalPins} across all views
        </div>
      )}
    </div>
  );
}
