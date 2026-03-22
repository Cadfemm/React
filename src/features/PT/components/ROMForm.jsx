import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const ROM_FIELDS = {
  title: "RANGE OF MOTION MEASUREMENTS (Degrees)",
  fields: [
    { type: "subheading", label: "Cervical Spine" },
    {
      type: "refraction-12col",
      name: "rom_cervical",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        {
          value: "flexion",
          label: "Flexion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }],
        },
        {
          value: "extension",
          label: "Extension",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }],
        },
        {
          value: "rotation",
          label: "Rotation",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 60°" }],
        },
        {
          value: "lateral_flexion",
          label: "Lateral Flexion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }],
        },
      ],
    },

    { type: "subheading", label: "Shoulder" },
    {
      type: "refraction-12col",
      name: "rom_shoulder",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 135°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0°" }] },
        { value: "abduction", label: "Abduction", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 180°" }] },
        { value: "adduction", label: "Adduction", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 30°" }] },
        { value: "internal_rotation", label: "Internal Rotation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 70°" }] },
        { value: "external_rotation", label: "External Rotation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 90°" }] },
      ],
    },

    { type: "subheading", label: "Elbow / Forearm" },
    {
      type: "refraction-12col",
      name: "rom_elbow_forearm",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 150°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0°" }] },
        { value: "pronation", label: "Pronation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 80°" }] },
        { value: "supination", label: "Supination", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 80°" }] },
      ],
    },

    { type: "subheading", label: "Wrist / Hand" },
    {
      type: "info-text",
      text: "Fill Wrist only if needed it is not mandatory",
      showIf: { field: "amp_upper_limb_location", equals: "carpal_metacarpal" },
    },
    {
      type: "refraction-12col",
      name: "rom_wrist_hand",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 80°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 70°" }] },
        {
          value: "radial_deviation",
          label: "Radial Deviation",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 20°" }],
        },
        {
          value: "ulnar_deviation",
          label: "Ulnar Deviation",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 30°" }],
        },
      ],
    },

    { type: "subheading", label: "Thoracolumbar Spine" },
    {
      type: "refraction-12col",
      name: "rom_thoracolumbar",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 60°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 25°" }] },
        { value: "rotation", label: "Rotation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 30°" }] },
        { value: "side_bending", label: "Side Bending", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 25°" }] },
      ],
    },

    { type: "subheading", label: "Hip" },
    {
      type: "refraction-12col",
      name: "rom_hip",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 120°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 30°" }] },
        { value: "abduction", label: "Abduction", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }] },
        { value: "adduction", label: "Adduction", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 30°" }] },
        { value: "internal_rotation", label: "Internal Rotation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }] },
        { value: "external_rotation", label: "External Rotation", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 45°" }] },
      ],
    },

    { type: "subheading", label: "Knee" },
    {
      type: "refraction-12col",
      name: "rom_knee",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {}, { type: "static", value: "0 - 135°" }] },
        { value: "extension", label: "Extension", columns: [{}, {}, {}, {}, { type: "static", value: "0°" }] },
      ],
    },

    { type: "subheading", label: "Ankle / Foot" },
    {
      type: "info-text",
      text: "If required, not Mandatory.",
      showIf: { field: "amp_lower_limb_location", equals: "tarsal_metatarsal" },
    },
    {
      type: "refraction-12col",
      name: "rom_ankle_foot",
      cornerLabel: "Movement",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: [
        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
        { label: "Normal", columns: [{ key: "" }] },
      ],
      rows: [
        {
          value: "dorsiflexion",
          label: "Dorsiflexion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 20°" }],
        },
        {
          value: "plantarflexion",
          label: "Plantarflexion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 50°" }],
        },
        {
          value: "inversion",
          label: "Inversion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 35°" }],
        },
        {
          value: "eversion",
          label: "Eversion",
          columns: [{}, {}, {}, {}, { type: "static", value: "0 - 15°" }],
        },
      ],
    },
  ],
};

const SECTION_ORDER = [
  "Cervical Spine",
  "Shoulder",
  "Elbow / Forearm",
  "Wrist / Hand",
  "Thoracolumbar Spine",
  "Hip",
  "Knee",
  "Ankle / Foot",
];

function splitFieldsBySubheading(fields) {
  const out = new Map();
  let current = null;
  fields.forEach(f => {
    if (f?.type === "subheading") {
      current = f.label;
      if (!out.has(current)) out.set(current, []);
      return;
    }
    if (!current) return;
    out.get(current).push(f);
  });
  return out;
}

export function buildROMSchema(region, subRegion, category, ampLowerLimbLocation, ampUpperLimbLocation) {
  const sectionsByName = splitFieldsBySubheading(ROM_FIELDS.fields);

  const spineSections = ["Cervical Spine", "Thoracolumbar Spine"];
  const upperSections = ["Shoulder", "Elbow / Forearm", "Wrist / Hand"];
  const lowerSections = ["Hip", "Knee", "Ankle / Foot"];
  const always = [];

  const regionArr = Array.isArray(region)
    ? region
    : region
      ? [region]
      : [];

  const hasSpine = regionArr.includes("spine");
  const hasUpper = regionArr.includes("upper_limb");
  const hasLower = regionArr.includes("lower_limb");

  let wanted = [];
  let forceEmpty = false;

  const categoryArr = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];
  const isAmputation = categoryArr.includes("amputation");
  const normalizedAmpLowerLimbLocation =
    typeof ampLowerLimbLocation === "string" ? ampLowerLimbLocation.trim() : ampLowerLimbLocation;
  const normalizedAmpUpperLimbLocation =
    typeof ampUpperLimbLocation === "string" ? ampUpperLimbLocation.trim() : ampUpperLimbLocation;

  // Special case: amputations with lower-limb location
  // Control which ROM sections appear based on location selection.
  if (isAmputation) {
    const hideEntireRom =
      normalizedAmpLowerLimbLocation === "hip_disortation" || normalizedAmpUpperLimbLocation === "shoulder_disortation";

    if (hideEntireRom) {
      wanted = [];
      forceEmpty = true;
    } else {
      let wantedUpper = [];
      let wantedLower = [];

      if (hasUpper) {
        if (normalizedAmpUpperLimbLocation === "above_elbow") wantedUpper = ["Shoulder"];
        else if (normalizedAmpUpperLimbLocation === "below_elbow") wantedUpper = ["Shoulder", "Elbow / Forearm"];
        else if (normalizedAmpUpperLimbLocation === "rays_amputation") wantedUpper = ["Shoulder", "Elbow / Forearm", "Wrist / Hand"];
        else if (normalizedAmpUpperLimbLocation === "carpal_metacarpal") {
          wantedUpper = ["Shoulder", "Elbow / Forearm", "Wrist / Hand"];
        }
      }

      if (hasLower) {
        if (normalizedAmpLowerLimbLocation === "above_knee") wantedLower = ["Hip"];
        else if (normalizedAmpLowerLimbLocation === "below_knee") wantedLower = ["Hip", "Knee"];
        else if (normalizedAmpLowerLimbLocation === "rays_amputation") wantedLower = ["Hip", "Knee", "Ankle / Foot"];
        else if (normalizedAmpLowerLimbLocation === "tarsal_metatarsal") wantedLower = ["Hip", "Knee", "Ankle / Foot"];
      }

      if (wantedUpper.length || wantedLower.length) wanted = [...wantedUpper, ...wantedLower];
    }
  }

  // Default behavior (when not overridden by amputation-location logic)
  if (!wanted.length && !forceEmpty) {
    // For Upper Limb selection, include both cervical + thoracolumbar spine ROM too.
    if (hasUpper) wanted = [...wanted, ...spineSections, ...upperSections, ...always];
    else if (hasSpine) wanted = [...wanted, ...spineSections, ...always];

    if (hasLower) wanted = [...wanted, ...lowerSections, ...always];
  }

  wanted = Array.from(new Set(wanted));

  if (!wanted.length && !forceEmpty) {
    wanted = SECTION_ORDER; // PT usage (no region) shows everything
  }

  return {
    title: ROM_FIELDS.title,
    // Render each ROM section as its own collapsible panel.
    fields: wanted.map((title, idx) => ({
      type: "accordion",
      name: `rom_section_${title}`,
      label: title,
      defaultOpen: idx === 0,
      children: sectionsByName.get(title) || [],
    })),
  };
}

export default function ROMForm({ values, onChange }) {
  const region = values?.region;
  const subRegion =
    (Array.isArray(region) ? region.includes("upper_limb") : region === "upper_limb")
      ? values?.region_upper_limb
      : (Array.isArray(region) ? region.includes("lower_limb") : region === "lower_limb")
        ? values?.region_lower_limb
        : undefined;
  const schema = useMemo(
    () =>
      buildROMSchema(
        region,
        subRegion,
        values?.category,
        values?.amp_lower_limb_location,
        values?.amp_upper_limb_location
      ),
    [region, subRegion, values?.category, values?.amp_lower_limb_location, values?.amp_upper_limb_location]
  );
  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
