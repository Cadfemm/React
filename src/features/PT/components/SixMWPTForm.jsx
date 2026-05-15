import { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── RPE Scale data ── */
const RPE_SCALE = [
  { score: 10, label: "Maximal Exertion",   desc: "Cannot push any harder",               color: "#dc2626" },
  { score: 9,  label: "Very Hard Activity", desc: "",                                      color: "#ea580c" },
  { score: 8,  label: "Hard Activity",      desc: "Difficulty breathing, unable to speak", color: "#f97316" },
  { score: 7,  label: "Hard Activity",      desc: "Heavy sweating, difficulty speaking",   color: "#fb923c" },
  { score: 6,  label: "Moderate Activity",  desc: "Moderate sweating, able to speak",     color: "#facc15" },
  { score: 5,  label: "Moderate Activity",  desc: "Speaking is easy, light sweating",     color: "#a3e635" },
  { score: 4,  label: "Light Activity",     desc: "Breaking a sweat, comfortable speaking", color: "#4ade80" },
  { score: 3,  label: "Light Activity",     desc: "Comfortable, slight difficulty breathing", color: "#34d399" },
  { score: 2,  label: "Minimum Activity",   desc: "Barest exertion",                      color: "#22d3ee" },
  { score: 1,  label: "Resting",            desc: "No exertion",                          color: "#38bdf8" },
];

function getRPE(val) {
  return RPE_SCALE.find((r) => r.score === Math.round(val)) || null;
}

/* ── Info Popup ── */
function RPEInfoPopup({ visible }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 28,
        left: 0,
        zIndex: 999,
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        minWidth: 300,
        overflow: "hidden",
        padding: "16px 20px",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        RATING OF PERCEIVED EXERTION
      </div>

      {RPE_SCALE.map(({ score, label, desc, color }) => (
        <div
          key={score}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            {score}
          </div>

          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
              }}
            >
              {label}
            </div>
            {desc && (
              <div
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                }}
              >
                {desc}
              </div>
            )}
          </div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: -7,
          left: 14,
          width: 0,
          height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderBottom: "7px solid #1e293b",
        }}
      />
    </div>
  );
}

/* ── Borg Slider ── */
function BorgSlider({ label, name, value, onChange }) {
  const [showInfo, setShowInfo] = useState(false);

  const numVal = Number(value) || 0;
  const rpe = getRPE(numVal);
  const pct = (numVal / 10) * 100;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Label + Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <label
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "#0f172a",
          }}
        >
          {label}
        </label>

        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowInfo((v) => !v)}
            onBlur={() => setTimeout(() => setShowInfo(false), 200)}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
            title="RPE Scale Info"
          >
            i
          </button>

          <RPEInfoPopup visible={showInfo} />
        </div>
      </div>

      {/* Slider */}
      <div
        style={{
          position: "relative",
          paddingTop: numVal > 0 ? 48 : 8,
        }}
      >
        {/* Tooltip */}
        {numVal > 0 && rpe && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `calc(${pct}% - 60px)`,
              background: rpe.color,
              color: "#fff",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              pointerEvents: "none",
              minWidth: 120,
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `6px solid ${rpe.color}`,
              }}
            />

            <span
              style={{
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              {numVal}
            </span>{" "}
            {rpe.label}

            {rpe.desc && (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  opacity: 0.9,
                }}
              >
                {rpe.desc}
              </div>
            )}
          </div>
        )}

        {/* Range Input */}
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={numVal}
          onChange={(e) => onChange(name, Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: rpe?.color || "#2563eb",
            cursor: "pointer",
            height: 5,
          }}
        />

        {/* Scale Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span
              key={n}
              style={{
                fontSize: 11,
                color: "#9ca3af",
                width: 16,
                textAlign: "center",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Single Combined Schema ── */
const SIX_MWPT_SCHEMA = {
  title: "6 Minutes Wheelchair Push Test",
  sections: [
    {
      fields: [
        {
          name: "distances",
          label: "Distances",
          type: "textarea",
        },
        {
          name: "fitness_level",
          label: "Level of Fitness",
          type: "radio",
          options: [
            { label: "Low Fitness", value: "low_fitness" },
            { label: "Moderate Fitness", value: "moderate_fitness" },
            { label: "High Fitness", value: "high_fitness" },
          ],
        },
      ],
    },
  ],
};

/* ── Main Component ── */
export default function SixMWPTForm({ values = {}, onChange }) {
  return (
    <div>
      {/* Form Builder Fields */}
      <CommonFormBuilder
        schema={SIX_MWPT_SCHEMA}
        values={values}
        onChange={onChange}
        layout="nested"
      />

      {/* Custom Borg Sliders */}
      <div style={{ padding: "10px 16px" }}>
        <BorgSlider
          label="Pre-BORG (RPE)"
          name="pre_borg"
          value={values.pre_borg}
          onChange={onChange}
        />

        <BorgSlider
          label="Post-BORG (RPE)"
          name="post_borg"
          value={values.post_borg}
          onChange={onChange}
        />
      </div>
    </div>
  );
}