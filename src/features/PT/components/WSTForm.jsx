import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const OPTIONS =  [
    { label: "TP", value: "tp" },
    { label: "NE", value: "ne"},
    { label: "0", value: "0"},
    { label: "1", value: "1"},
    { label: "2", value: "2"},
    { label: "3", value: "3"}
]
/* ===================== SCHEMA ===================== */
const WST_SCHEMA = {
  title: "Wheelchair Skills Test",
  sections: [
    {
      fields: [
        {
          type: "grid-header",
          label: "Individual Skill",
          cols: ["Capacity", "Comments"]
        },
        {
          type: "grid-row",
          name: "positions_controller",
          label: "Positions controller",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "turn_power_on_off",
          label: "Turn power on and off",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "operates_battery_charger",
          label: "Operates battery charger",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "disengages_and_engages_motors",
          label: "Disengages and engages motors",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "changes_program_modes",
          label: "Changes program modes",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "changes_speed_setting",
          label: "Changes speed setting",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "operates_body_positioning_options",
          label: "Operates body positioning options",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "rolls_forward",
          label: "Rolls forward",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "rolls_backward",
          label: "Rolls backward",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "turns_in_place",
          label: "Turns in place",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "maneuver_sideways",
          label: "Maneuver sideways",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "turns_while_moving_forward",
          label: "Turns while moving forward",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "turns_while_moving_backward",
          label: "Turns while moving backward",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "reaches_objects",
          label: "Reaches objects",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "shifts_weight",
          label: "Shifts weight",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "performs_level_transfers",
          label: "Performs level transfers",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "performs_ground_transfers",
          label: "Performs ground transfers",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "gets_through_hinged_door",
          label: "Gets through hinged door",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "ascends_slight_incline",
          label: "Ascends slight incline",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "descends_slight_incline",
          label: "Descends slight incline",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "ascends_steep_incline",
          label: "Ascends steep incline",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "descends_steep_incline",
          label: "Descends steep incline",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "rolls_on_soft_surface",
          label: "Rolls on soft surface",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "gets_over_obstacle",
          label: "Gets over obstacle",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "ascends_low_curb",
          label: "Ascends low curb",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
          type: "grid-row",
          name: "descends_low_curb",
          label: "Descends low curb",
          cols: [{ type: "single-select", options:OPTIONS }, "input", ]
        },
        {
            name: "total_score",
            label: "Total Score",
            type: "score-box"
        }
      ]
    }
  ]
};


/* ===================== COMPONENT ===================== */
export default function WSTForm({ values, onChange }) {

  /* ===== AUTO TOTAL ===== */
  React.useEffect(() => {
    const total = Array.from({ length: 14 }, (_, i) =>
      Number(values[`wst_${i + 1}`] || 0)
    ).reduce((a, b) => a + b, 0);

    if (values.wst_total !== total) {
      onChange("wst_total", total);
    }
  }, [values, onChange]);

  return (
    <CommonFormBuilder
      schema={WST_SCHEMA}
      values={values}
      layout="nested"
      onChange={onChange}
    />
  );
}
