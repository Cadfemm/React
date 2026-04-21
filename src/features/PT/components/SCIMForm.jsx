import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const r = (name, label, options) => ({
  type: "radio", name, label, labelAbove: true, options,
});

function subtotal(keys, values) {
  return keys.reduce((s, k) => s + (Number(values[k]) || 0), 0);
}

function ScoreBar({ label, score, max }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px", background: "#1e3a5f", borderRadius: 8, marginTop: 12
    }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{label}</span>
      <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>{score} / {max}</span>
    </div>
  );
}

const SELF_CARE_FIELDS = [
  r("scim_feeding", "1. Feeding", [
    { label: "0 – Needs parenteral/gastrostomy/fully assisted oral feeding", value: "0" },
    { label: "1 – Needs partial assistance for eating/drinking or adaptive devices", value: "1" },
    { label: "2 – Eats independently; needs adaptive devices or assistance only for cutting/pouring/opening", value: "2" },
    { label: "3 – Eats and drinks independently; no assistance or adaptive devices", value: "3" },
  ]),
  r("scim_bathing_upper", "2A. Bathing – Upper Body", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance", value: "1" },
    { label: "2 – Washes independently with adaptive devices or specific setting", value: "2" },
    { label: "3 – Washes independently; no adaptive devices or specific setting", value: "3" },
  ]),
  r("scim_bathing_lower", "2B. Bathing – Lower Body", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance", value: "1" },
    { label: "2 – Washes independently with adaptive devices or specific setting", value: "2" },
    { label: "3 – Washes independently; no adaptive devices or specific setting", value: "3" },
  ]),
  r("scim_dressing_upper", "3A. Dressing – Upper Body", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance with cwobzl", value: "1" },
    { label: "2 – Independent with cwobzl; requires adss", value: "2" },
    { label: "3 – Independent with cwobzl; no adss; needs assistance only for bzl", value: "3" },
    { label: "4 – Dresses any cloth independently; no adaptive devices or specific setting", value: "4" },
  ]),
  r("scim_dressing_lower", "3B. Dressing – Lower Body", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance with cwobzl", value: "1" },
    { label: "2 – Independent with cwobzl; requires adss", value: "2" },
    { label: "3 – Independent with cwobzl without adss; needs assistance only for bzl", value: "3" },
    { label: "4 – Dresses any cloth independently; no adaptive devices or specific setting", value: "4" },
  ]),
  r("scim_grooming", "4. Grooming", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance", value: "1" },
    { label: "2 – Grooms independently with adaptive devices", value: "2" },
    { label: "3 – Grooms independently without adaptive devices", value: "3" },
  ]),
];
const SELF_CARE_KEYS = ["scim_feeding","scim_bathing_upper","scim_bathing_lower","scim_dressing_upper","scim_dressing_lower","scim_grooming"];

const RESP_FIELDS = [
  r("scim_respiration", "5. Respiration", [
    { label: "0 – Requires TT and permanent or intermittent assisted ventilation (IAV)", value: "0" },
    { label: "2 – Breathes independently with TT; requires oxygen, much assistance in coughing or TT management", value: "2" },
    { label: "4 – Breathes independently with TT; requires little assistance in coughing or TT management", value: "4" },
    { label: "6 – Breathes independently without TT; requires oxygen, much assistance in coughing, mask or IAV", value: "6" },
    { label: "8 – Breathes independently without TT; requires little assistance or stimulation for coughing", value: "8" },
    { label: "10 – Breathes independently without assistance or device", value: "10" },
  ]),
  r("scim_bladder", "6. Sphincter Management – Bladder", [
    { label: "0 – Indwelling catheter", value: "0" },
    { label: "3 – RUV > 100cc; no regular catheterization or assisted intermittent catheterization", value: "3" },
    { label: "6 – RUV < 100cc or intermittent self-catheterization; needs assistance for applying drainage instrument", value: "6" },
    { label: "9 – Intermittent self-catheterization; uses external drainage instrument; no assistance for applying", value: "9" },
    { label: "11 – Intermittent self-catheterization; continent between catheterizations; no external drainage instrument", value: "11" },
    { label: "13 – RUV <100cc; needs only external urine drainage; no assistance required", value: "13" },
    { label: "15 – RUV <100cc; continent; does not use external drainage instrument", value: "15" },
  ]),
  r("scim_bowel", "7. Sphincter Management – Bowel", [
    { label: "0 – Irregular timing or very low frequency (< once in 3 days) of bowel movements", value: "0" },
    { label: "5 – Regular timing, but requires assistance; rare accidents (< twice a month)", value: "5" },
    { label: "8 – Regular bowel movements, without assistance; rare accidents (< twice a month)", value: "8" },
    { label: "10 – Regular bowel movements, without assistance; no accidents", value: "10" },
  ]),
  r("scim_toilet", "8. Use of Toilet", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Requires partial assistance; does not clean self", value: "1" },
    { label: "2 – Requires partial assistance; cleans self independently", value: "2" },
    { label: "4 – Uses toilet independently but needs adaptive devices or special setting", value: "4" },
    { label: "5 – Uses toilet independently; no adaptive devices or special setting", value: "5" },
  ]),
];
const RESP_KEYS = ["scim_respiration","scim_bladder","scim_bowel","scim_toilet"];

const MOB_ROOM_FIELDS = [
  r("scim_bed_mobility", "9. Mobility in Bed and Action to Prevent Pressure Sores", [
    { label: "0 – Needs assistance in all activities", value: "0" },
    { label: "2 – Performs one of the activities without assistance", value: "2" },
    { label: "4 – Performs two or three of the activities without assistance", value: "4" },
    { label: "6 – Performs all bed mobility and pressure release activities independently", value: "6" },
  ]),
  r("scim_transfer_bed_wc", "10. Transfers: Bed–Wheelchair", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Needs partial assistance and/or supervision and/or adaptive devices", value: "1" },
    { label: "2 – Independent (or does not require wheelchair)", value: "2" },
  ]),
  r("scim_transfer_wc_toilet", "11. Transfers: Wheelchair–Toilet–Tub", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Needs partial assistance and/or supervision and/or adaptive devices", value: "1" },
    { label: "2 – Independent (or does not require wheelchair)", value: "2" },
  ]),
];
const MOB_ROOM_KEYS = ["scim_bed_mobility","scim_transfer_bed_wc","scim_transfer_wc_toilet"];

const MOBILITY_OPTS = [
  { label: "0 – Requires total assistance", value: "0" },
  { label: "1 – Needs electric wheelchair or partial assistance to operate manual wheelchair", value: "1" },
  { label: "2 – Moves independently in manual wheelchair", value: "2" },
  { label: "3 – Requires supervision while walking (with or without devices)", value: "3" },
  { label: "4 – Walks with a walking frame or crutches (swing)", value: "4" },
  { label: "5 – Walks with crutches or two canes (reciprocal walking)", value: "5" },
  { label: "6 – Walks with one cane", value: "6" },
  { label: "7 – Needs leg orthosis only", value: "7" },
  { label: "8 – Walks without walking aids", value: "8" },
];

const MOB_OUTDOOR_FIELDS = [
  r("scim_mob_indoors",  "12. Mobility Indoors",                           MOBILITY_OPTS),
  r("scim_mob_moderate", "13. Mobility for Moderate Distances (10–100 m)", MOBILITY_OPTS),
  r("scim_mob_outdoors", "14. Mobility Outdoors (> 100 m)",                MOBILITY_OPTS),
  r("scim_stairs", "15. Stair Management", [
    { label: "0 – Unable to ascend or descend stairs", value: "0" },
    { label: "1 – Ascends and descends at least 3 steps with support or supervision of another person", value: "1" },
    { label: "2 – Ascends and descends at least 3 steps with support of handrail and/or crutch or cane", value: "2" },
    { label: "3 – Ascends and descends at least 3 steps without any support or supervision", value: "3" },
  ]),
  r("scim_transfer_wc_car", "16. Transfers: Wheelchair–Car", [
    { label: "0 – Requires total assistance", value: "0" },
    { label: "1 – Needs partial assistance and/or supervision and/or adaptive devices", value: "1" },
    { label: "2 – Transfers independent; no adaptive devices (or does not require wheelchair)", value: "2" },
  ]),
  r("scim_transfer_ground_wc", "17. Transfers: Ground–Wheelchair", [
    { label: "0 – Requires assistance", value: "0" },
    { label: "1 – Transfers independent with or without adaptive devices (or does not require wheelchair)", value: "1" },
  ]),
];
const MOB_OUTDOOR_KEYS = ["scim_mob_indoors","scim_mob_moderate","scim_mob_outdoors","scim_stairs","scim_transfer_wc_car","scim_transfer_ground_wc"];

const ALL_KEYS = [...SELF_CARE_KEYS, ...RESP_KEYS, ...MOB_ROOM_KEYS, ...MOB_OUTDOOR_KEYS];

export default function SCIMForm({ values, onChange }) {
  const schema = {
    title: "SCIM – Spinal Cord Independence Measure",
    fields: [
      {
        type: "accordion", name: "scim_self_care",
        label: "Self-Care (Items 1–4)",
        defaultOpen: true,
        children: [
          ...SELF_CARE_FIELDS,
          { name: "_sc1", type: "custom", render: ({ values }) =>
            <ScoreBar label="Subtotal Self-Care" score={subtotal(SELF_CARE_KEYS, values)} max={20} /> },
        ],
      },
      {
        type: "accordion", name: "scim_resp",
        label: "Respiration and Sphincter Management (Items 5–8)",
        defaultOpen: false,
        children: [
          ...RESP_FIELDS,
          { name: "_sc2", type: "custom", render: ({ values }) =>
            <ScoreBar label="Subtotal Respiration & Sphincter" score={subtotal(RESP_KEYS, values)} max={40} /> },
        ],
      },
      {
        type: "accordion", name: "scim_mob_room",
        label: "Mobility – Room and Toilet (Items 9–11)",
        defaultOpen: false,
        children: [
          ...MOB_ROOM_FIELDS,
          { name: "_sc3", type: "custom", render: ({ values }) =>
            <ScoreBar label="Subtotal Mobility (Room & Toilet)" score={subtotal(MOB_ROOM_KEYS, values)} max={10} /> },
        ],
      },
      {
        type: "accordion", name: "scim_mob_outdoor",
        label: "Mobility – Indoors and Outdoors (Items 12–17)",
        defaultOpen: false,
        children: [
          ...MOB_OUTDOOR_FIELDS,
          { name: "_sc4", type: "custom", render: ({ values }) =>
            <ScoreBar label="Subtotal Mobility (Indoors & Outdoors)" score={subtotal(MOB_OUTDOOR_KEYS, values)} max={40} /> },
        ],
      },
      {
        name: "_scim_total", type: "custom",
        render: ({ values }) => {
          const t = subtotal(ALL_KEYS, values);
          return (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px", background: "#0f172a", borderRadius: 10, marginTop: 16
            }}>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>TOTAL SCIM SCORE</span>
              <span style={{ fontWeight: 900, fontSize: 22, color: "#38bdf8" }}>{t} / 100</span>
            </div>
          );
        }
      },
    ],
  };

  return (
    <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />
  );
}
