import React, { useRef, useEffect, useState, useCallback } from "react";
import rightFootImage from "../../../assets/RightFoot.png";
import leftFootImage from "../../../assets/LeftFoot.png";

const DRAW_COLOR = "#c00";
const DRAW_WIDTH = 3;

function DrawableCanvas({ width, height, value, onChange, label, children, showClearButton = true }) {
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

  const handleClear = useCallback(() => {
    if (!ctx || !canvasRef.current) return;
    const w = canvasRef.current.width / (window.devicePixelRatio || 1);
    const h = canvasRef.current.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    onChange(null);
  }, [ctx, onChange]);

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
        <div style={{ position: "absolute", bottom: -20, left: 0, fontSize: 12, fontWeight: 600, color: "#374151" }}>
          {label}
        </div>
      )}
      {showClearButton && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            zIndex: 2,
            fontSize: 11,
            padding: "4px 10px",
            background: "#fff",
            border: "1px solid #d1d5db",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}

const boxStyle = {
  width: "100%",
  height: "100%",
  background: "#fff",
  overflow: "hidden"
};

export default function DiabeticFootDiagram({ value = {}, onChange }) {
  const data = value || {};
  const setFoot = (side, dataUrl) => {
    onChange({ ...data, [side]: dataUrl });
  };

  const boxSize = 280;
  const boxHeight = 200;

  return (
    <div style={{ marginTop: 12, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "flex-start" }}>
        <div style={{ flex: "0 0 auto" }}>
          <DrawableCanvas
            width={boxSize}
            height={boxHeight}
            value={data.right}
            onChange={(url) => setFoot("right", url)}
            label="Right"
            showClearButton={false}
          >
            <div style={boxStyle}>
              <img
                src={rightFootImage}
                alt="Right foot"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          </DrawableCanvas>
          <button type="button" onClick={() => setFoot("right", null)} style={{ marginTop: 8 }}>
            Clear Right
          </button>
        </div>
        <div style={{ flex: "0 0 auto" }}>
          <DrawableCanvas
            width={boxSize}
            height={boxHeight}
            value={data.left}
            onChange={(url) => setFoot("left", url)}
            label="Left"
            showClearButton={false}
          >
            <div style={boxStyle}>
              <img
                src={leftFootImage}
                alt="Left foot"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          </DrawableCanvas>
          <button type="button" onClick={() => setFoot("left", null)} style={{ marginTop: 8 }}>
            Clear Left
          </button>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#64748b", marginTop: 12 }}>
        Mark the location with an arrow or an &quot;X&quot;. Use the buttons below to clear marks.
      </p>
    </div>
  );
}
