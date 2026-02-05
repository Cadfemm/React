import React, { useRef, useEffect, useState, useCallback } from "react";
import woundTemplate from "../../../assets/wound_location.png";

const DRAW_COLOR = "#c00";
const DRAW_WIDTH = 3;

const DrawableCanvas = function DrawableCanvas({ width, height, value, onChange, label, children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    const context = canvas.getContext("2d");
    context.scale(dpr, dpr);
    context.strokeStyle = DRAW_COLOR;
    context.lineWidth = DRAW_WIDTH;
    context.lineCap = "round";
    context.lineJoin = "round";
    setCtx(context);
  }, [width, height]);

  useEffect(() => {
    if (!ctx || !canvasRef.current) return;
    if (!value) {
      const w = canvasRef.current.width / (window.devicePixelRatio || 1);
      const h = canvasRef.current.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      return;
    }
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = value;
  }, [value, ctx, width, height]);

  const getCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width) / (window.devicePixelRatio || 1),
      y: (e.clientY - rect.top) * (canvas.height / rect.height) / (window.devicePixelRatio || 1)
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, [ctx, getCoords]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing, ctx, getCoords]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && onChange) {
      try {
        onChange(canvas.toDataURL("image/png"));
      } catch (err) {
        console.warn("Canvas export failed", err);
      }
    }
  }, [isDrawing, onChange]);

  const handleMouseLeave = useCallback(() => {
    if (isDrawing) handleMouseUp();
  }, [isDrawing, handleMouseUp]);

  return (
    <div ref={containerRef} style={{ position: "relative", width, height, marginBottom: 8 }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width,
          height,
          cursor: "crosshair",
          zIndex: 1,
          background: "transparent"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
      {label && (
        <div style={{ position: "absolute", bottom: -20, left: 0, fontSize: 11, color: "#374151" }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default function WoundLocationDiagramSingle({ value, onChange }) {
  // store a single png overlay (just the red markings)
  const overlay = value?.overlay || null;

  // adjust these to match how big you want it in UI
  const width = 900;
  const height = Math.round((width * 220) / 1000); // keep aspect-ish (tune if needed)

  return (
    <div style={{ marginTop: 12, marginBottom: 16 }}>
      <DrawableCanvas
        width={width}
        height={height}
        value={overlay}
        onChange={(url) => onChange({ overlay: url })}
        label={null}
      >
        <div style={{ width: "100%", height: "100%", background: "#fff" }}>
          <img
            src={woundTemplate}
            alt="Wound location template"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block"
            }}
          />
        </div>
      </DrawableCanvas>
      <button
        type="button"
        onClick={() => onChange({ overlay: null })}
        style={{ marginTop: 8 }}
      >
        Clear Marks
      </button>
    </div>
  );
}
