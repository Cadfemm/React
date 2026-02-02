import React, { useState } from "react";

const INITIAL_FIELDS = [
  { name: "thigh", x: 720, y: 260, size: 48 },
  { name: "knee", x: 720, y: 340, size: 48 },
  { name: "leg", x: 720, y: 420, size: 48 }
];

export default function AnatomySvgEditor({ image }) {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [dragging, setDragging] = useState(null);

  const onMouseDown = (e, name) => {
    e.stopPropagation();
    setDragging({
      name,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY
    });
  };

  const onMouseMove = e => {
    if (!dragging) return;

    const svg = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svg.left - dragging.offsetX;
    const y = e.clientY - svg.top - dragging.offsetY;

    setFields(f =>
      f.map(item =>
        item.name === dragging.name
          ? { ...item, x: Math.round(x), y: Math.round(y) }
          : item
      )
    );
  };

  const onMouseUp = () => setDragging(null);

  const exportJSON = () => {
    console.log("EXPORT THIS ⬇️");
    console.log(JSON.stringify(fields, null, 2));
    alert("Positions printed in console");
  };

  return (
    <>
      <svg
        viewBox="0 0 1000 1600"
        width="100%"
        style={{ border: "1px solid #ccc" }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <image href={image} width="1000" height="1600" />

        {fields.map(f => (
          <g
            key={f.name}
            transform={`translate(${f.x}, ${f.y})`}
            onMouseDown={e => onMouseDown(e, f.name)}
            style={{ cursor: "move" }}
          >
            <rect
              width={f.size}
              height={f.size}
              rx="8"
              fill="transparent"
              stroke="black"
              strokeWidth="2"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="10"
            >
              {f.name}
            </text>
          </g>
        ))}
      </svg>

      <button
        onClick={exportJSON}
        style={{
          marginTop: 12,
          padding: "6px 12px",
          fontWeight: "bold"
        }}
      >
        Export Positions
      </button>
    </>
  );
}
