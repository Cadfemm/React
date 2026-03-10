import React, { useEffect, useMemo, useRef } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

function BodyChartCanvas({ label, value, onChange, name }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  const width = 320;
  const height = 420;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 3;

    if (!value) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = value;
  }, [value]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
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
    const ctx = canvas.getContext("2d");
    const p = getPoint(e);
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
    onChange(name, canvas.toDataURL("image/png"));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div
        style={{
          position: "relative",
          width,
          height,
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          background: "#fff",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 320 420"
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0 }}
        >
          <rect x="0" y="0" width="320" height="420" fill="#ffffff" />
          {/* Minimal body outline (front/back neutral) */}
          <circle cx="160" cy="55" r="28" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <path
            d="M120 90 C135 105 145 125 150 150 C152 175 148 205 140 230 C130 260 125 295 128 330 C130 360 140 385 160 410"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M200 90 C185 105 175 125 170 150 C168 175 172 205 180 230 C190 260 195 295 192 330 C190 360 180 385 160 410"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M120 120 C90 150 85 180 90 210"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M200 120 C230 150 235 180 230 210"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M140 230 C130 265 128 300 130 330"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <path
            d="M180 230 C190 265 192 300 190 330"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />
        </svg>

        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0, touchAction: "none" }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => onChange(name, "")}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Clear drawing
        </button>
      </div>
    </div>
  );
}

export default function PainAssessmentForm({ values, onChange }) {
  const schema = useMemo(() => {
    return {
      title: "",
      sections: [
        {
          fields: [
            { type: "subheading", label: "History Taking" },
            { name: "pain_history_specify", label: "Specify", type: "textarea" },
            {
              name: "pain_onset",
              label: "Onset",
              type: "radio",
              options: [
                { label: "Sudden", value: "sudden" },
                { label: "Insidious", value: "insidious" },
              ],
            },
            {
              name: "pain_duration",
              label: "Duration",
              type: "radio",
              options: [
                { label: "Acute Pain (<3 months)", value: "acute_lt_3m" },
                { label: "Chronic Pain (≥3 months)", value: "chronic_ge_3m" },
                { label: "Acute on chronic pain", value: "acute_on_chronic" },
              ],
            },

            { type: "subheading", label: "Description of Pain" },
            {
              name: "pain_type",
              label: "",
              type: "radio",
              options: [
                { label: "Nociceptive pain", value: "nociceptive" },
                { label: "Neuropathic Pain", value: "neuropathic" },
                { label: "Mixed", value: "mixed" },
              ],
            },
            {
              name: "nociceptive_pain_quality",
              label: "Nociceptive pain",
              type: "radio",
              labelAbove: true,
              options: [
                { label: "Sharp", value: "sharp" },
                { label: "Dull", value: "dull" },
                { label: "Throbbing", value: "throbbing" },
                { label: "Well Localised", value: "well_localised" },
              ],
              showIf: { field: "pain_type", equals: "nociceptive" },
            },
            {
              name: "neuropathic_pain_quality",
              label: "Neuropathic Pain",
              type: "radio",
              labelAbove: true,
              options: [
                { label: "Burning", value: "burning" },
                { label: "Shooting/Stabbing", value: "shooting_stabbing" },
                { label: "Lancinating", value: "lancinating" },
                { label: "Poorly Localised", value: "poorly_localised" },
              ],
              showIf: { field: "pain_type", equals: "neuropathic" },
            },
            {
              name: "pain_pattern",
              label: "Pattern of Pain",
              type: "radio",
              options: [
                { label: "Constant", value: "constant" },
                { label: "Intermittent", value: "intermittent" },
              ],
            },
            {
              name: "pain_scale_population",
              label: "Severity of pain / Pain Score",
              type: "radio",
              labelAbove: true,
              options: [
                {
                  label: "Cognitively Intact Adult & Children ≥7 years old",
                  value: "intact_ge_7",
                },
                {
                  label: "Cognitively impaired adult & Children <7 years old",
                  value: "impaired_lt_7",
                },
              ],
            },
            {
              name: "pain_scale_launcher_intact",
              label: "",
              type: "assessment-launcher",
              options: [{ label: "MOH Pain Scale", value: "moh_pain_scale" }],
              showIf: { field: "pain_scale_population", equals: "intact_ge_7" },
            },
            {
              name: "pain_scale_launcher_impaired",
              label: "",
              type: "assessment-launcher",
              options: [
                { label: "FLACC Scale", value: "flacc_scale" },
                { label: "MOH Faces Scale", value: "moh_faces_scale" },
              ],
              showIf: { field: "pain_scale_population", equals: "impaired_lt_7" },
            },
            { type: "subheading", label: "Pain Score" },
            {
              name: "pain_score_rest",
              label: "At Rest",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true,
            },
            {
              name: "pain_score_movement",
              label: "On Movement",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true,
            },
            {
              name: "pain_score_worst_daily",
              label: "Worst Level of Pain Score Experienced in a Day",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true,
            },
            {
              name: "pain_score_least_daily",
              label: "Least Level of Pain Score Experienced in a Day",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true,
            },
            { name: "pain_radiation", label: "Radiation", type: "input" },
            { name: "pain_aggravating", label: "Aggravating Factors", type: "input" },
            { name: "pain_relieving", label: "Relieving Factors", type: "input" },
            {
              name: "pain_associated_symptoms",
              label: "Associated symptoms",
              type: "checkbox-group",
              options: [
                { label: "Numbness", value: "numbness" },
                { label: "Tingling", value: "tingling" },
                { label: "Allodynia", value: "allodynia" },
                { label: "Hyperalgesia", value: "hyperalgesia" },
                { label: "Weakness", value: "weakness" },
              ],
            },
            {
              name: "pain_associated_numbness_specify",
              label: "Numbness - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "numbness" },
            },
            {
              name: "pain_associated_tingling_specify",
              label: "Tingling - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "tingling" },
            },
            {
              name: "pain_associated_allodynia_specify",
              label: "Allodynia - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "allodynia" },
            },
            {
              name: "pain_associated_hyperalgesia_specify",
              label: "Hyperalgesia - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "hyperalgesia" },
            },
            {
              name: "pain_associated_weakness_specify",
              label: "Weakness - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "weakness" },
            },
          ],
        },
      ],
    };
  }, []);

  const PAIN_SCALE_REGISTRY = useMemo(() => {
    return {
      moh_pain_scale: function MOHPainScale({ values: v, onChange: c }) {
        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    {
                      type: "subheading",
                      label: "MOH Pain Scale",
                    },
                    {
                      name: "moh_pain_scale_score",
                      label: "Score (0–10)",
                      type: "scale-slider",
                      min: 0,
                      max: 10,
                      step: 1,
                      showValue: true,
                    },
                  ],
                },
              ],
            }}
            values={v}
            onChange={c}
            layout="nested"
          />
        );
      },
      flacc_scale: function FLACCScale({ values: v, onChange: c }) {
        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    { type: "subheading", label: "FLACC Scale" },
                    {
                      name: "flacc_score",
                      label: "Score (0–10)",
                      type: "scale-slider",
                      min: 0,
                      max: 10,
                      step: 1,
                      showValue: true,
                    },
                  ],
                },
              ],
            }}
            values={v}
            onChange={c}
            layout="nested"
          />
        );
      },
      moh_faces_scale: function MOHFacesScale({ values: v, onChange: c }) {
        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    { type: "subheading", label: "MOH Faces Scale" },
                    {
                      name: "moh_faces_scale_score",
                      label: "Score (0–10)",
                      type: "scale-slider",
                      min: 0,
                      max: 10,
                      step: 1,
                      showValue: true,
                    },
                  ],
                },
              ],
            }}
            values={v}
            onChange={c}
            layout="nested"
          />
        );
      },
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <BodyChartCanvas
        label="Site of Pain (draw)"
        name="pain_site_drawing"
        value={values.pain_site_drawing || ""}
        onChange={onChange}
      />

      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        assessmentRegistry={PAIN_SCALE_REGISTRY}
        layout="nested"
      />
    </div>
  );
}

