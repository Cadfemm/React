import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Scoring options ── */
const OPTIONS = [
  { label: "TE", value: "te" },
  { label: "NP", value: "np" },
  { label: "0",  value: "0"  },
  { label: "1",  value: "1"  },
  { label: "2",  value: "2"  },
  { label: "3",  value: "3"  },
];

/* ── Powered Wheelchair Skills ── */
const POWERED_SKILLS = [
  "positions_controller",
  "turn_power_on_and_off",
  "operates_battery_charger",
  "disengages_and_engages_motors",
  "changes_program_modes",
  "changes_speed_setting",
  "operates_body_positioning_options",
  "rolls_forward",
  "rolls_backward",
  "turns_in_place",
  "maneuver_sideways",
  "turns_while_moving_forward",
  "turns_while_moving_backward",
  "reaches_objects",
  "shifts_weight",
  "performs_level_transfers",
  "performs_ground_transfers",
  "gets_through_hinged_door",
  "ascends_slight_incline",
  "descends_slight_incline",
  "ascends_steep_incline",
  "descends_steep_incline",
  "rolls_on_soft_surface",
  "gets_over_obstacle",
  "ascends_low_curb",
  "descends_low_curb",
];

/* ── Manual Wheelchair Skills ── */
const MANUAL_SKILLS = [
  "manual_rolls_forward",
  "manual_rolls_backward",
  "manual_turns_in_place",
  "manual_turns_while_moving_forward",
  "manual_turns_while_moving_backward",
  "manual_rolls_on_soft_surface",
  "manual_gets_over_obstacle",
  "manual_ascends_low_curb",
  "manual_descends_low_curb",
  "manual_ascends_high_curb",
  "manual_descends_high_curb",
  "manual_performs_wheelie",
  "manual_reaches_objects",
  "manual_shifts_weight",
  "manual_performs_level_transfers",
  "manual_performs_ground_transfers",
  "manual_gets_through_hinged_door",
  "manual_ascends_slight_incline",
  "manual_descends_slight_incline",
  "manual_ascends_steep_incline",
  "manual_descends_steep_incline",
  "manual_folds_and_unfolds",
  "manual_loads_into_car",
];

/* ── Formula:
   WST% = sum of scores / ([total skills − NP count − TE count] × 3) × 100
   Values stored as fieldName_0 (capacity col) by FormBuilder grid-row
── */
function calcWST(values, skillFields) {
  let sumScores   = 0;
  let totalSkills = skillFields.length;
  let npCount     = 0;
  let teCount     = 0;

  skillFields.forEach(field => {
    // FormBuilder stores grid-row col 0 value as `fieldName_0`
    const v = values[`${field}_0`];
    if (v === "np") { npCount++;  return; }
    if (v === "te") { teCount++;  return; }
    if (v === undefined || v === null || v === "") return;
    const n = Number(v);
    if (!isNaN(n)) sumScores += n;
  });

  const denominator = (totalSkills - npCount - teCount) * 3;
  const pct = denominator > 0 ? Math.round((sumScores / denominator) * 100) : 0;

  return { sumScores, totalSkills, npCount, teCount, denominator, pct };
}

/* ── Helper: build schema for a skill set ── */
function buildSchema(title, skillFields) {
  return {
    title,
    sections: [{
      fields: [
        {
          type: "grid-header",
          label: "Individual Skill",
          cols: ["Capacity (TE/NP/0/1/2/3)", "Comments"],
        },
        ...skillFields.map(name => ({
          type: "grid-row",
          name,
          label: name
            .replace(/^manual_/, "")
            .replace(/_/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase()),
          cols: [{ type: "single-select", options: OPTIONS }, "input"],
        })),
      ],
    }],
  };
}

const POWERED_SCHEMA = buildSchema("Powered Wheelchair Skills", POWERED_SKILLS);
const MANUAL_SCHEMA  = buildSchema("Manual Wheelchair Skill",  MANUAL_SKILLS);

/* ── Score Summary Panel ── */
function ScoreSummary({ label, result }) {
  const { sumScores, denominator, pct } = result;
  const color =
    pct >= 75 ? "#16a34a" :
    pct >= 50 ? "#d97706" :
    pct >  0  ? "#dc2626" : "#374151";

  return (
    <div style={{ margin: "8px 0 16px" }}>
      {/* Total Score row — score-box style */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        background: "#f8fafc",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        fontSize: 14, fontWeight: 700, color: "#111827",
      }}>
        <span>Total Score</span>
        <span style={{ color: "#111827", fontSize: 16, fontWeight: 800 }}>{sumScores} / {denominator}</span>
      </div>

      {/* WST % row */}
      {/* <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        fontSize: 14, fontWeight: 700, color: "#111827",
      }}>
        <span>WST %</span>
        <span style={{ color, fontSize: 16, fontWeight: 800 }}>{pct}%</span>
      </div> */}
    </div>
  );
}

/* ── WST Header (Version 5.4 info fields) ── */
function WSTHeader({ type, prefix, values, onChange }) {
  // Normal text input
  const inp = (name, placeholder, width = "100%") => (
    <input
      type="text"
      value={values[`${prefix}_${name}`] || ""}
      onChange={(e) => onChange(`${prefix}_${name}`, e.target.value)}
      placeholder={placeholder}
      style={{
        width,
        border: "none",
        borderBottom: "1.5px solid #374151",
        outline: "none",
        fontSize: 14,
        padding: "2px 4px",
        background: "transparent",
        color: "#111827",
      }}
    />
  );

  // Date input
  const dateInp = (name, width = "160px") => (
    <input
      type="date"
      value={values[`${prefix}_${name}`] || ""}
      onChange={(e) => onChange(`${prefix}_${name}`, e.target.value)}
      style={{
        width,
        border: "none",
        borderBottom: "1.5px solid #374151",
        outline: "none",
        fontSize: 14,
        padding: "2px 4px",
        background: "transparent",
        color: "#111827",
      }}
    />
  );

  return (
    <div
      style={{
        padding: "16px 20px 12px",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 15,
          color: "#111827",
          marginBottom: 2,
        }}
      >
        Wheelchair Skills Test (WST) Version 5.4 Form
      </div>

      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: "#111827",
          marginBottom: 12,
        }}
      >
        {type}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 24px",
          fontSize: 14,
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ whiteSpace: "nowrap" }}>
            Name of wheelchair user:
          </span>
          {inp("user_name", "")}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ whiteSpace: "nowrap" }}>
            Caregiver assisting (if any):
          </span>
          {inp("caregiver", "")}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ whiteSpace: "nowrap" }}>Tester:</span>
          {inp("tester", "", "160px")}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ whiteSpace: "nowrap" }}>Date:</span>
          {dateInp("date", "160px")}
        </div>
      </div>
    </div>
  );
}
/* ── Main Component ── */
export default function WSTForm({ values = {}, onChange }) {
  const [activeType, setActiveType] = useState("powered");

  const poweredResult = calcWST(values, POWERED_SKILLS);
  const manualResult  = calcWST(values, MANUAL_SKILLS);

  return (
    <div>
      {/* Wheelchair type tabs */}
      <div style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid #e5e7eb", background: "#fff", marginBottom: 0 }}>
        {[
          { key: "powered", label: "Powered Wheelchair" },
          { key: "manual",  label: "Manual Wheelchair"  },
        ].map(t => (
          <div
            key={t.key}
            onClick={() => setActiveType(t.key)}
            style={{
              padding: "14px 32px",
              fontWeight: 700, fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: activeType === t.key ? "#2563eb" : "#374151",
              borderBottom: activeType === t.key ? "3px solid #2563eb" : "3px solid transparent",
              marginBottom: -2,
              transition: "color .15s",
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Powered */}
      {activeType === "powered" && (
        <>
          {/* WST Header */}
          <WSTHeader type="Powered Wheelchairs" prefix="powered" values={values} onChange={onChange} />
          <CommonFormBuilder schema={POWERED_SCHEMA} values={values} layout="nested" onChange={onChange} />
          <ScoreSummary label="Powered Wheelchair" result={poweredResult} />
        </>
      )}

      {/* Manual */}
      {activeType === "manual" && (
        <>
          {/* WST Header */}
          <WSTHeader type="Manual Wheelchairs" prefix="manual" values={values} onChange={onChange} />
          <CommonFormBuilder schema={MANUAL_SCHEMA} values={values} layout="nested" onChange={onChange} />
          <ScoreSummary label="Manual Wheelchair" result={manualResult} />
        </>
      )}
    </div>
  );
}
