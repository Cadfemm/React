
import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

/* ── Shared actions ── */
const ACTIONS = [
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

/* ══════════════════════════════════════════════════════════
   SCHEMAS
══════════════════════════════════════════════════════════ */

const SUBJECTIVE_SCHEMA = {
  title: "Progress Note",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      
    ],
  }],
};
const OBJECTIVE_SCHEMA = {
  title: "Intervention",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      title: "Therapeutic Interventions",
      fields: [

// ======================================================
// PAIN MANAGEMENT
// ======================================================

{
  type: "subheading",
  label: "Pain Management"
},

{
  name: "pain_management",
  
  type: "checkbox-group",
  options: [
    { label: "Manual Therapy", value: "manual_therapy" },
    { label: "Heat Therapy", value: "heat_therapy" },
    { label: "Ultrasound Therapy", value: "ultrasound_therapy" },
    { label: "Ice/Cryocuff", value: "ice_cryocuff" },
    { label: "TENS", value: "tens" },
    { label: "NMES", value: "nmes" },
    { label: "Functional Magnetic Stimulation (FMS)", value: "fms" },
    { label: "Shockwave Therapy", value: "shockwave_therapy" },
    { label: "Laser Therapy (Lightforce Laser)", value: "lightforce_laser" },
    { label: "Laser Therapy (Triple Laser)", value: "triple_laser" },
    { label: "CryoMag Therapy", value: "cryomag_therapy" },
    { label: "Magneto Therapy", value: "magneto_therapy" },
    { label: "Spinal Decompression Therapy (SpineMed)", value: "spinemed_therapy" },
    { label: "Tecar Therapy", value: "tecar_therapy" },
    { label: "Wax Therapy", value: "wax_therapy" },
    { label: "Others", value: "others" }
  ]
},

// ======================================================
// MANUAL THERAPY
// ======================================================

{
  type: "subheading",
  label: "Manual Therapy",
  showIf: {
    field: "pain_management",
    includes: "manual_therapy"
  }
},

{ type: "row", showIf: { field: "pain_management", includes: "manual_therapy" }, fields: [
  { name: "manual_therapy_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// HEAT THERAPY
// ======================================================

{
  type: "subheading",
  label: "Heat Therapy",
  showIf: {
    field: "pain_management",
    includes: "heat_therapy"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "heat_therapy" },
  fields: [
    {
      name: "heat_therapy_body_part",
      label: "Body Part",
      type: "input"
    },
    {
      name: "heat_therapy_duration",
      label: "Duration",
      type: "input"
    },
    {
      name: "heat_therapy_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// ======================================================
// ULTRASOUND THERAPY
// ======================================================

{
  type: "subheading",
  label: "Ultrasound Therapy",
  showIf: {
    field: "pain_management",
    includes: "ultrasound_therapy"
  }
},

{ type: "row", showIf: { field: "pain_management", includes: "ultrasound_therapy" }, fields: [
  { name: "ultrasound_body_part", label: "Body Part", type: "input" },
]},

{
  name: "ultrasound_frequency",
  label: "Frequency",
  type: "radio",
  options: [
    { label: "1 MHz", value: "1mhz" },
    { label: "3 MHz", value: "3mhz" }
  ],
  showIf: {
    field: "pain_management",
    includes: "ultrasound_therapy"
  }
},

{
  name: "ultrasound_duty_cycle",
  label: "Duty Cycle",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "pain_management",
    includes: "ultrasound_therapy"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "ultrasound_therapy" },
  fields: [
    {
      name: "ultrasound_intensity",
      label: "Intensity (W/cm²)",
      type: "input"
    },
    {
      name: "ultrasound_duration",
      label: "Duration (Minutes)",
      type: "input"
    },
    {
      name: "ultrasound_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
// ======================================================
// ICE / CRYOCUFF
// ======================================================

{
  type: "subheading",
  label: "Ice / Cryocuff",
  showIf: {
    field: "pain_management",
    includes: "ice_cryocuff"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "ice_cryocuff" },
  fields: [
    {
      name: "cryocuff_body_part",
      label: "Body Part",
      type: "input"
    },
    {
      name: "cryocuff_duration",
      label: "Duration (Minutes)",
      type: "input"
    },
    {
      name: "cryocuff_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// ======================================================
// TENS
// ======================================================

{
  type: "subheading",
  label: "TENS",
  showIf: {
    field: "pain_management",
    includes: "tens"
  }
},

{
  name: "tens_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Conventional", value: "conventional" },
    { label: "Low Frequency", value: "low_frequency" },
    { label: "Modulation", value: "modulation" },
    { label: "Burst", value: "burst" }
  ],
  showIf: {
    field: "pain_management",
    includes: "tens"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "tens" },
  fields: [
    {
      name: "tens_pulse_width",
      label: "Pulse Width (μs)",
      type: "input"
    },
    {
      name: "tens_intensity",
      label: "Intensity (mA)",
      type: "input"
    },
    {
      name: "tens_duration",
      label: "Duration (Minutes)",
      type: "input"
    },
    {
      name: "tens_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
{ type: "row", showIf: { field: "pain_management", includes: "others" }, fields: [
  { name: "pain_management_others", label: "Others (Free Text for Parameter)", type: "input" },
]},
// ======================================================
// NMES
// ======================================================

{
  type: "subheading",
  label: "Neuromuscular Electrical Stimulation (NMES)",
  showIf: {
    field: "pain_management",
    includes: "nmes"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "nmes" },
  fields: [
    {
      name: "nmes_frequency",
      label: "Frequency (Hz)",
      type: "input"
    },
    {
      name: "nmes_pulse_width",
      label: "Pulse Width (μs)",
      type: "input"
    },
    {
      name: "nmes_intensity",
      label: "Intensity (mA)",
      type: "input"
    },
    {
      name: "nmes_ramp_time",
      label: "Ramp Time (sec)",
      type: "input"
    },
    {
      name: "nmes_duration",
      label: "Duration (Minutes)",
      type: "input"
    },
    {
      name: "nmes_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
// ======================================================
// FMS
// ======================================================

{
  type: "subheading",
  label: "Functional Magnetic Stimulation (FMS)",
  showIf: {
    field: "pain_management",
    includes: "fms"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "fms" },
  fields: [
    {
      name: "fms_body_part",
      label: "Body Part",
      type: "input"
    },
    {
      name: "fms_program",
      label: "Program",
      type: "input"
    },
    {
      name: "fms_duration",
      label: "Duration",
      type: "input"
    },
    {
      name: "fms_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
{
  type: "subheading",
  label: "Laser Therapy (Lightforce Laser)",
  showIf: {
    field: "pain_management",
    includes: "lightforce_laser"
  }
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "lightforce_laser" },
  fields: [
    { name: "lightforce_body_parts",  label: "Body Parts",           type: "input", placeholder: "Specify body parts"        },
    { name: "lightforce_applicators", label: "Types of Applicators", type: "input", placeholder: "Specify applicator types"  },
    { name: "lightforce_power",       label: "Power (Watts)",        type: "input", placeholder: "Enter power in Watts"      },
  ]
},
{
  name: "lightforce_mode",
  label: "Mode",
  type: "radio-group",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed",     value: "pulsed"     },
  ],
  showIf: { field: "pain_management", includes: "lightforce_laser" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "lightforce_laser" },
  fields: [
    { name: "lightforce_total_energy", label: "Total Energy (Joules)", type: "input", placeholder: "Enter total energy in Joules" },
    { name: "lightforce_remarks",      label: "Remarks",               type: "input", placeholder: "Enter remarks"               },
  ]
},
{
  type: "subheading",
  label: "Laser Therapy (Triple Laser)",
  showIf: { field: "pain_management", includes: "triple_laser" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "triple_laser" },
  fields: [
    { name: "triple_laser_body_part", label: "Body Part",      type: "input", placeholder: "Specify body part"   },
    { name: "triple_laser_program",   label: "Program",        type: "input", placeholder: "Specify program"     },
    { name: "triple_laser_power",     label: "Power (Watts)",  type: "input", placeholder: "Enter power in Watts"},
  ]
},
{
  name: "triple_laser_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed",     value: "pulsed"     },
  ],
  showIf: { field: "pain_management", includes: "triple_laser" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "triple_laser" },
  fields: [
    { name: "triple_laser_total_energy", label: "Total Energy (Joules)", type: "input", placeholder: "Enter total energy in Joules" },
    { name: "triple_laser_remarks",      label: "Remarks",               type: "input", placeholder: "Enter remarks"               },
  ]
},
{
  type: "subheading",
  label: "CryoMag Therapy",
  showIf: { field: "pain_management", includes: "cryomag_therapy" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "cryomag_therapy" },
  fields: [
    { name: "cryomag_body_parts", label: "Body Parts", type: "input", placeholder: "Specify body parts" },
    { name: "cryomag_program",    label: "Program",    type: "input", placeholder: "Specify program"    },
    { name: "cryomag_duration",   label: "Duration",   type: "input", placeholder: "Enter duration"     },
    { name: "cryomag_remarks",    label: "Remarks",    type: "input", placeholder: "Enter remarks"      },
  ]
},
{
  type: "subheading",
  label: "Magneto Therapy",
  showIf: { field: "pain_management", includes: "magneto_therapy" },
},
{
  name: "magneto_applicator",
  label: "Applicator",
  type: "radio",
  options: [
    { label: "Solenoid",                value: "solenoid"              },
    { label: "Flat Pad (Square)",       value: "flat_pad_square"       },
    { label: "Flat Pad (Rectangular)",  value: "flat_pad_rectangular"  },
  ],
  showIf: { field: "pain_management", includes: "magneto_therapy" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "magneto_therapy" },
  fields: [
    { name: "magneto_frequency", label: "Frequency (Hz)", type: "input", placeholder: "Enter frequency in Hz" },
    { name: "magneto_duration",  label: "Duration",       type: "input", placeholder: "Enter duration"        },
    { name: "magneto_remarks",   label: "Remarks",        type: "input", placeholder: "Enter remarks"         },
  ]
},
{
  type: "subheading",
  label: "Spinal Decompression Therapy (SpineMed)",
  showIf: { field: "pain_management", includes: "spinemed_therapy" },
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "spinemed_therapy" },
  fields: [
    { name: "spinemed_parameters", label: "Parameters", type: "input", placeholder: "Enter parameters" },
    { name: "spinemed_remarks",    label: "Remarks",    type: "input", placeholder: "Enter remarks"    },
  ]
},
{
  type: "subheading",
  label: "Tecar Therapy",
  showIf: {
    field: "pain_management",
    includes: "tecar_therapy"
  }
},
{
  name: "tecar_body_parts",
  label: "Body Parts",
  type: "input",
  placeholder: "Specify body parts",
  showIf: {
    field: "pain_management",
    includes: "tecar_therapy"
  }
},
{
  name: "tecar_modes",
  label: "Modes",
  type: "radio",
  options: [
    { label: "Capacitive", value: "capacitive" },
    { label: "Resistive", value: "resistive" }
  ],
  showIf: {
    field: "pain_management",
    includes: "tecar_therapy"
  }
},
{
  name: "tecar_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" }
  ],
  showIf: {
    field: "pain_management",
    includes: "tecar_therapy"
  }
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "tecar_therapy" },
  fields: [
    {
      name: "tecar_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes",
    },
    {
      name: "tecar_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
    }
  ]
},
{
  type: "row",
  showIf: { field: "pain_management", includes: "wax_therapy" },
  fields: [
    {
      name: "wax_body_part",
      label: "Body Part",
      type: "input",
      placeholder: "Specify body part",
    },
    {
      name: "wax_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes",
    },
    {
      name: "wax_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
    }
  ]
},
// ======================================================
// SHOCKWAVE THERAPY
// ======================================================

{
  type: "subheading",
  label: "Shockwave Therapy",
  showIf: {
    field: "pain_management",
    includes: "shockwave_therapy"
  }
},

{
  name: "shockwave_body_part",
  label: "Body Part",
  type: "input",
  showIf: {
    field: "pain_management",
    includes: "shockwave_therapy"
  }
},

{
  name: "shockwave_type",
  label: "Type of Shockwave",
  type: "radio",
  options: [
    { label: "Radial", value: "radial" },
    { label: "Focused", value: "focused" }
  ],
  showIf: {
    field: "pain_management",
    includes: "shockwave_therapy"
  }
},

{
  name: "shockwave_efd",
  label: "Energy Flux Density (EFD)",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "pain_management",
    includes: "shockwave_therapy"
  }
},

{
  type: "row",
  showIf: { field: "pain_management", includes: "shockwave_therapy" },
  fields: [
    {
      name: "shockwave_impulses",
      label: "Number of Impulses (Shocks)",
      type: "input"
    },
    {
      name: "shockwave_frequency",
      label: "Frequency (Hz)",
      type: "input"
    },
    {
      name: "shockwave_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},


// ======================================================
// SWELLING MANAGEMENT
// ======================================================

{
  type: "subheading",
  label: "Swelling Management"
},

{
  name: "swelling_management",
  type: "checkbox-group",
  options: [
    { label: "CryoMag Therapy", value: "cryomag_therapy" },
    { label: "Magneto Therapy", value: "magneto_therapy" },
    { label: "Ice/Cryocuff", value: "ice_cryocuff" },
    { label: "Laser Therapy (Lightforce Laser)", value: "lightforce_laser" },
    { label: "Laser Therapy (Triple Laser)", value: "triple_laser" },
    { label: "Others", value: "others" }
  ]
},

// ======================================================
// CRYOMAG THERAPY
// ======================================================

{
  type: "row",
  showIf: { field: "swelling_management", includes: "cryomag_therapy" },
  fields: [
    { name: "swelling_cryomag_body_part", label: "Body Parts", type: "input" },
    { name: "swelling_cryomag_program",   label: "Program",    type: "input" },
    { name: "swelling_cryomag_duration",  label: "Duration",   type: "input" },
    { name: "swelling_cryomag_remarks",   label: "Remarks",    type: "input" },
  ]
},
// ======================================================
// MAGNETO THERAPY
// ======================================================

{
  type: "subheading",
  label: "Magneto Therapy",
  showIf: {
    field: "swelling_management",
    includes: "magneto_therapy"
  }
},

{
  name: "swelling_magneto_applicator",
  label: "Applicator",
  type: "radio",
  options: [
    { label: "Solenoid", value: "solenoid" },
    { label: "Flat Pad (Square)", value: "flat_pad_square" },
    { label: "Flat Pad (Rectangular)", value: "flat_pad_rectangular" }
  ],
  showIf: {
    field: "swelling_management",
    includes: "magneto_therapy"
  }
},

{ type: "row", showIf: { field: "swelling_management", includes: "magneto_therapy" }, fields: [
  { name: "swelling_magneto_frequency", label: "Frequency (Hz)", type: "input" },
  { name: "swelling_magneto_duration", label: "Duration", type: "input" },
]},
{ type: "row", showIf: { field: "swelling_management", includes: "magneto_therapy" }, fields: [
  { name: "swelling_magneto_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// ICE / CRYOCUFF
// ======================================================

{
  type: "subheading",
  label: "Ice / Cryocuff",
  showIf: {
    field: "swelling_management",
    includes: "ice_cryocuff"
  }
},

{ type: "row", showIf: { field: "swelling_management", includes: "ice_cryocuff" }, fields: [
  { name: "swelling_cryocuff_body_part", label: "Body Part", type: "input" },
  { name: "swelling_cryocuff_duration", label: "Duration (Minutes)", type: "input" },
]},
{ type: "row", showIf: { field: "swelling_management", includes: "ice_cryocuff" }, fields: [
  { name: "swelling_cryocuff_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// LASER THERAPY (LIGHTFORCE LASER)
// ======================================================

{
  type: "subheading",
  label: "Laser Therapy (Lightforce Laser)",
  showIf: {
    field: "swelling_management",
    includes: "lightforce_laser"
  }
},

{ type: "row", showIf: { field: "swelling_management", includes: "lightforce_laser" }, fields: [
  { name: "lightforce_body_parts", label: "Body Parts", type: "input" },
  { name: "lightforce_applicators", label: "Types of Applicators", type: "input" },
]},
{ type: "row", showIf: { field: "swelling_management", includes: "lightforce_laser" }, fields: [
  { name: "lightforce_power", label: "Power (Watts)", type: "input" },
  { name: "lightforce_total_energy", label: "Total Energy (Joules)", type: "input" },
]},
{
  name: "lightforce_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "swelling_management",
    includes: "lightforce_laser"
  }
},
{ type: "row", showIf: { field: "swelling_management", includes: "lightforce_laser" }, fields: [
  { name: "lightforce_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// LASER THERAPY (TRIPLE LASER)
// ======================================================

{
  type: "subheading",
  label: "Laser Therapy (Triple Laser)",
  showIf: {
    field: "swelling_management",
    includes: "triple_laser"
  }
},

{ type: "row", showIf: { field: "swelling_management", includes: "triple_laser" }, fields: [
  { name: "triple_laser_body_part", label: "Body Part", type: "input" },
  { name: "triple_laser_program", label: "Program", type: "input" },
]},
{ type: "row", showIf: { field: "swelling_management", includes: "triple_laser" }, fields: [
  { name: "triple_laser_power", label: "Power (Watts)", type: "input" },
  { name: "triple_laser_total_energy", label: "Total Energy (Joules)", type: "input" },
]},
{
  name: "triple_laser_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "swelling_management",
    includes: "triple_laser"
  }
},
{ type: "row", showIf: { field: "swelling_management", includes: "triple_laser" }, fields: [
  { name: "triple_laser_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// OTHERS
// ======================================================

{
  type: "subheading",
  label: "Others",
  showIf: {
    field: "swelling_management",
    includes: "others"
  }
},

{ type: "row", showIf: { field: "swelling_management", includes: "others" }, fields: [
  { name: "swelling_management_others", label: "Others", type: "input" },
]},
// ======================================================
// TISSUE HEALING & REGENERATION
// ======================================================

{
  type: "subheading",
  label: "Tissue Healing & Regeneration"
},

{
  name: "tissue_healing_management",

  type: "checkbox-group",
  options: [
    {
      label: "Magneto Therapy",
      value: "magneto_therapy"
    },
    {
      label: "Laser Therapy (Lightforce Laser)",
      value: "lightforce_laser"
    },
    {
      label: "Laser Therapy (Triple Laser)",
      value: "triple_laser"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

// ======================================================
// MAGNETO THERAPY
// ======================================================

{
  type: "subheading",
  label: "Magneto Therapy",
  showIf: {
    field: "tissue_healing_management",
    includes: "magneto_therapy"
  }
},

{
  name: "tissue_magneto_applicator",
  label: "Applicator",
  type: "radio",
  options: [
    { label: "Solenoid", value: "solenoid" },
    { label: "Flat Pad (Square)", value: "flat_pad_square" },
    { label: "Flat Pad (Rectangular)", value: "flat_pad_rectangular" }
  ],
  showIf: {
    field: "tissue_healing_management",
    includes: "magneto_therapy"
  }
},

{ type: "row", showIf: { field: "tissue_healing_management", includes: "magneto_therapy" }, fields: [
  { name: "tissue_magneto_frequency", label: "Frequency (Hz)", type: "input" },
  { name: "tissue_magneto_duration", label: "Duration", type: "input" },
]},
{ type: "row", showIf: { field: "tissue_healing_management", includes: "magneto_therapy" }, fields: [
  { name: "tissue_magneto_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// LASER THERAPY (LIGHTFORCE LASER)
// ======================================================

{
  type: "subheading",
  label: "Laser Therapy (Lightforce Laser)",
  showIf: {
    field: "tissue_healing_management",
    includes: "lightforce_laser"
  }
},

{ type: "row", showIf: { field: "tissue_healing_management", includes: "lightforce_laser" }, fields: [
  { name: "tissue_lightforce_body_parts", label: "Body Parts", type: "input" },
  { name: "tissue_lightforce_applicator", label: "Types of Applicators", type: "input" },
]},
{ type: "row", showIf: { field: "tissue_healing_management", includes: "lightforce_laser" }, fields: [
  { name: "tissue_lightforce_power", label: "Power (Watts)", type: "input" },
  { name: "tissue_lightforce_total_energy", label: "Total Energy (Joules)", type: "input" },
]},
{
  name: "tissue_lightforce_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "tissue_healing_management",
    includes: "lightforce_laser"
  }
},
{ type: "row", showIf: { field: "tissue_healing_management", includes: "lightforce_laser" }, fields: [
  { name: "tissue_lightforce_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// LASER THERAPY (TRIPLE LASER)
// ======================================================

{
  type: "subheading",
  label: "Laser Therapy (Triple Laser)",
  showIf: {
    field: "tissue_healing_management",
    includes: "triple_laser"
  }
},

{ type: "row", showIf: { field: "tissue_healing_management", includes: "triple_laser" }, fields: [
  { name: "tissue_triple_laser_body_part", label: "Body Part", type: "input" },
  { name: "tissue_triple_laser_program", label: "Program", type: "input" },
]},
{ type: "row", showIf: { field: "tissue_healing_management", includes: "triple_laser" }, fields: [
  { name: "tissue_triple_laser_power", label: "Power (Watts)", type: "input" },
  { name: "tissue_triple_laser_total_energy", label: "Total Energy (Joules)", type: "input" },
]},
{
  name: "tissue_triple_laser_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "tissue_healing_management",
    includes: "triple_laser"
  }
},

{ type: "row", showIf: { field: "tissue_healing_management", includes: "triple_laser" }, fields: [
  { name: "tissue_triple_laser_total_energy", label: "Total Energy (Joules)", type: "input" },
  { name: "tissue_triple_laser_remarks", label: "Remarks", type: "input" },
]},

// ======================================================
// OTHERS
// ======================================================

{
  type: "subheading",
  label: "Others",
  showIf: {
    field: "tissue_healing_management",
    includes: "others"
  }
},

{ type: "row", showIf: { field: "tissue_healing_management", includes: "others" }, fields: [
  { name: "tissue_healing_other_parameters", label: "Other Parameters", type: "input" },
]},
// ======================================================
// WELLNESS
// ======================================================

{
  type: "subheading",
  label: "Wellness"
},

{
  name: "wellness_programs",
  label: "Multi-cryo Hacking System (Program = P)",
  type: "checkbox-group",
  options: [
    {
      label: "Stress Management (P1)",
      value: "stress_management_p1"
    },
    {
      label: "Regenerations (P2)",
      value: "regenerations_p2"
    },
    {
      label: "Performance (P3)",
      value: "performance_p3"
    },
    {
      label: "Cellulite/Tissue (P4)",
      value: "cellulite_tissue_p4"
    },
    {
      label: "Dermo (P5)",
      value: "dermo_p5"
    },
    {
      label: "Natural Empowerment (P6)",
      value: "natural_empowerment_p6"
    },
    {
      label: "Fresh Breath (P7)",
      value: "fresh_breath_p7"
    },
    {
      label: "Deep Empowerment (P8)",
      value: "deep_empowerment_p8"
    },
    {
      label: "Vitality (P9)",
      value: "vitality_p9"
    }
  ]
},

{ type: "row", fields: [
  { name: "wellness_duration", label: "Duration", type: "input" },
  { name: "wellness_remarks", label: "Remarks", type: "input" },
]},
// ======================================================
// THERAPEUTIC EXERCISES
// ======================================================

{
  type: "subheading",
  label: "Therapeutic Exercises"
},

{
  name: "therapeutic_exercises",
  
  type: "checkbox-group",
  options: [
    {
      label: "Mobilizing/Stretching",
      value: "mobilizing_stretching"
    },
    {
      label: "Strength Training",
      value: "strength_training"
    },
    {
      label: "Endurance Training",
      value: "endurance_training"
    },
    {
      label: "Neuromuscular / Balance Control",
      value: "neuromuscular_balance_control"
    },
    {
      label: "Gait / Ambulation Training",
      value: "gait_ambulation_training"
    },
    {
      label: "Functional Training",
      value: "functional_training"
    },
    {
      label: "Other",
      value: "other"
    }
  ]
},

// ======================================================
// MOBILIZING / STRETCHING
// ======================================================

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "mobilizing_stretching" }, fields: [
  { name: "mobilizing_stretching_remarks", label: "Mobilizing / Stretching Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "strength_training" }, fields: [
  { name: "strength_training_remarks", label: "Strength Training Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "endurance_training" }, fields: [
  { name: "endurance_training_remarks", label: "Endurance Training Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "neuromuscular_balance_control" }, fields: [
  { name: "neuromuscular_balance_control_remarks", label: "Neuromuscular / Balance Control Remarks", type: "input" },
]},

// ======================================================
// GAIT / AMBULATION TRAINING
// ======================================================

{
  name: "gait_ambulation_mode",
  label: "Gait / Ambulation Training Mode",
  type: "radio",
  options: [
    {
      label: "With BWS",
      value: "with_bws"
    },
    {
      label: "Without BWS",
      value: "without_bws"
    },
    {
      label: "Parallel Bar",
      value: "parallel_bar"
    }
  ],
  showIf: {
    field: "therapeutic_exercises",
    includes: "gait_ambulation_training"
  }
},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "gait_ambulation_training" }, fields: [
  { name: "gait_ambulation_remarks", label: "Gait / Ambulation Training Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "functional_training" }, fields: [
  { name: "functional_training_remarks", label: "Functional Training Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_exercises", includes: "other" }, fields: [
  { name: "therapeutic_exercises_other", label: "Other Therapeutic Exercise", type: "input" },
]},
{
          type: "subheading",
          label: "Specialized Therapeutic Programs"
        },
  {
      name: "specialized_therapeutic_programs",

      type: "checkbox-group",
      options: [
        { label: "Cyriax Method", value: "cyriax_method" },
        { label: "Pilates Exercises", value: "pilates_exercises" },
        { label: "Neurac Therapy", value: "neurac_therapy" },
        { label: "Kinesio Taping", value: "kinesio_taping" },
        { label: "Myofascial Release", value: "myofascial_release" },
        { label: "Craniosacral Therapy", value: "craniosacral_therapy" },
        { label: "Neural Manipulation", value: "neural_manipulation" },
        { label: "Visceral Manipulation", value: "visceral_manipulation" },
        { label: "PNF", value: "pnf" },
        { label: "Mulligan Technique", value: "mulligan_technique" },
        { label: "Maitland Technique", value: "maitland_technique" },
        { label: "McKenzie Technique", value: "mckenzie_technique" },
        { label: "Kaltenborn Technique", value: "kaltenborn_technique" },
        { label: "Muscle Energy Technique", value: "muscle_energy_technique" }
      ]
    },

    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "cyriax_method" }, fields: [
      { name: "cyriax_method_remarks", label: "Cyriax Method Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "pilates_exercises" }, fields: [
      { name: "pilates_exercises_remarks", label: "Pilates Exercises Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "neurac_therapy" }, fields: [
      { name: "neurac_therapy_remarks", label: "Neurac Therapy Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "kinesio_taping" }, fields: [
      { name: "kinesio_taping_remarks", label: "Kinesio Taping Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "myofascial_release" }, fields: [
      { name: "myofascial_release_remarks", label: "Myofascial Release Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "craniosacral_therapy" }, fields: [
      { name: "craniosacral_therapy_remarks", label: "Craniosacral Therapy Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "neural_manipulation" }, fields: [
      { name: "neural_manipulation_remarks", label: "Neural Manipulation Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "visceral_manipulation" }, fields: [
      { name: "visceral_manipulation_remarks", label: "Visceral Manipulation Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "pnf" }, fields: [
      { name: "pnf_remarks", label: "PNF Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "mulligan_technique" }, fields: [
      { name: "mulligan_technique_remarks", label: "Mulligan Technique Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "maitland_technique" }, fields: [
      { name: "maitland_technique_remarks", label: "Maitland Technique Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "mckenzie_technique" }, fields: [
      { name: "mckenzie_technique_remarks", label: "McKenzie Technique Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "kaltenborn_technique" }, fields: [
      { name: "kaltenborn_technique_remarks", label: "Kaltenborn Technique Remarks", type: "input" },
    ]},
    { type: "row", showIf: { field: "specialized_therapeutic_programs", includes: "muscle_energy_technique" }, fields: [
      { name: "muscle_energy_technique_remarks", label: "Muscle Energy Technique Remarks", type: "input" },
    ]},
  {
  type: "subheading",
  label: "Functional Exercises (Exercise Modalities)"
},
{
  name: "functional_exercises",
  
  type: "checkbox-group",
  options: [
    { label: "AXELERO Gait and Balance", value: "axelero_gait_balance" },
    { label: "Akuis Sintesi Pro", value: "akuis_sintesi_pro" },
    { label: "Cycling", value: "cycling" },
    { label: "HUR System", value: "hur_system" },
    { label: "DAVID Machine", value: "david_machine" },
    { label: "Treadmill", value: "treadmill" },
    { label: "Biodex Isokinetic", value: "biodex_isokinetic" },
    { label: "Multipurpose Gym", value: "multipurpose_gym" },
    { label: "Power Plate", value: "power_plate" },
    { label: "D Wall", value: "d_wall" },
    { label: "Shuttle Recovery", value: "shuttle_recovery" },
    { label: "Dyaco Rowing", value: "dyaco_rowing" },
    { label: "Recumbent Bike (NordicTrack)", value: "recumbent_bike" },
    { label: "Elliptical Exercise Machine", value: "elliptical_machine" },
    { label: "Huber 360 Balance and Coordination", value: "huber_360" },
    { label: "Neofect Smart Balance", value: "neofect_smart_balance" },
    { label: "Sidra Leg", value: "sidra_leg" },
    { label: "Others", value: "others" }
  ]
},

// ======================================================
// AXELERO GAIT AND BALANCE
// ======================================================

{
  name: "axelero_mode",
  label: "AXELERO - Mode of Training",
  type: "radio",
  options: [
    { label: "Duration", value: "duration" },
    { label: "Distance", value: "distance" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "axelero_gait_balance"
  }
},
{ type: "row", showIf: { field: "axelero_mode", equals: "duration" }, fields: [
  { name: "axelero_time", label: "Time", type: "input" },
  { name: "axelero_speed", label: "Speed", type: "input", showIf: { field: "functional_exercises", includes: "axelero_gait_balance" } },
]},
{ type: "row", showIf: { field: "axelero_mode", equals: "distance" }, fields: [
  { name: "axelero_distance", label: "Distance", type: "input" },
]},

// ======================================================
// AKUIS SINTESI PRO
// ======================================================

{
  type: "subheading",
  label: "Akuis Sintesi Pro",
  showIf: {
    field: "functional_exercises",
    includes: "akuis_sintesi_pro"
  }
},
{
  type: "subheading",
  label: "Constant Training Parameters",
  showIf: {
    field: "akuis_training_type",
    includes: "constant"
  }
},
{
  name: "akuis_training_type",
  label: "Akuis Sintesi Pro - Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Constant Training", value: "constant" },
    { label: "Eccentric Training", value: "eccentric" },
    { label: "Auxotonic Training", value: "auxotonic" },
    { label: "Viscous Training", value: "viscous" },
    { label: "Vibration Training", value: "vibration" },
    { label: "Precision Training", value: "precision" },
    { label: "Magnetic Training", value: "magnetic" },
    { label: "Isometric Training", value: "isometric" },
    { label: "Isokinetic Training", value: "isokinetic" },
    { label: "Random Training", value: "random" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "akuis_sintesi_pro"
  }
},

// ======================================================
// CONSTANT TRAINING
// ======================================================


// ========================= CONSTANT =========================
{
  type: "row",
  name: "akuis_constant_row",
  showIf: {
    field: "akuis_training_type",
    includes: "constant"
  },
  fields: [
    { name: "constant_weight", label: "Weight (kg)", type: "input" },
    { name: "constant_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},

// ========================= ECCENTRIC =========================
{
  type: "row",
  name: "akuis_eccentric_row",
  showIf: {
    field: "akuis_training_type",
    includes: "eccentric"
  },
  fields: [
    { name: "eccentric_weight", label: "Weight (kg)", type: "input" },
    { name: "eccentric_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},

// ========================= AUXOTONIC =========================
{
  type: "row",
  name: "akuis_auxotonic_row",
  showIf: {
    field: "akuis_training_type",
    includes: "auxotonic"
  },
  fields: [
    { name: "auxotonic_stiffness", label: "Stiffness Level", type: "input" },
    { name: "auxotonic_min_load", label: "Min Load (kg)", type: "input" },
    { name: "auxotonic_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},

// ========================= VISCOUS =========================
{
  type: "row",
  name: "akuis_viscous_row",
  showIf: {
    field: "akuis_training_type",
    includes: "viscous"
  },
  fields: [
    { name: "viscous_viscosity_level", label: "Viscosity Level", type: "input" },
    { name: "viscous_min_load", label: "Min Load (kg)", type: "input" },
    { name: "viscous_return_load", label: "Return Load (kg)", type: "input" },
    { name: "viscous_space_transition", label: "Space Transition (cm)", type: "input" },
    { name: "viscous_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},


// ========================= VIBRATION =========================
{
  type: "row",
  name: "akuis_vibration_row",
  showIf: {
    field: "akuis_training_type",
    includes: "vibration"
  },
  fields: [
    { name: "vibration_base_load", label: "Base Load (kg)", type: "input" },
    { name: "vibration_amplitude", label: "Amplitude (kg)", type: "input" },
    { name: "vibration_frequency", label: "Frequency (Hz)", type: "input" },
    {
  name: "vibration_angle",
  label: "Constant Angle / Fixed Position (°)",
  type: "input",}
  ]
},


// ========================= PRECISION =========================
{
  type: "row",
  name: "akuis_precision_row",
  showIf: {
    field: "akuis_training_type",
    includes: "precision"
  },
  fields: [
    { name: "precision_load", label: "Load (kg)", type: "input" },
    { name: "precision_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},

// ========================= MAGNETIC =========================
{
  type: "row",
  name: "akuis_magnetic_row",
  showIf: {
    field: "akuis_training_type",
    includes: "magnetic"
  },
  fields: [
    { name: "magnetic_stiffness", label: "Stiffness Level", type: "input" },
    { name: "magnetic_max_load", label: "Max Load (kg)", type: "input" },
    { name: "magnetic_min_load", label: "Min Load (kg)", type: "input" },
    {
  name: "magnetic_angle",
  label: "Constant Angle / Fixed Position (°)",
  type: "input",}
  ]
},


// ========================= ISOMETRIC =========================
{
  type: "row",
  name: "akuis_isometric_row",
  showIf: {
    field: "akuis_training_type",
    includes: "isometric"
  },
  fields: [
    { name: "isometric_position", label: "Position (cm)", type: "input" },
    { name: "isometric_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},

// ========================= ISOKINETIC =========================
{
  type: "row",
  name: "akuis_isokinetic_row",
  showIf: {
    field: "akuis_training_type",
    includes: "isokinetic"
  },
  fields: [
    { name: "isokinetic_speed", label: "Speed (mm/s)", type: "input" },
    { name: "isokinetic_return_load", label: "Return Load (kg)", type: "input" },
    { name: "isokinetic_start_position", label: "Start Position (cm)", type: "input" },
    { name: "isokinetic_stop_position", label: "Stop Position (cm)", type: "input" },
    { name: "isokinetic_angle", label: "Constant Angle / Fixed Position (°)", type: "input" }
  ]
},


// ========================= RANDOM =========================
{
  type: "row",
  name: "akuis_random_row",
  showIf: {
    field: "akuis_training_type",
    includes: "random"
  },
  fields: [
    { name: "random_base_load", label: "Base Load (kg)", type: "input" },
    { name: "random_lambda", label: "Lambda Level", type: "input" },
    { name: "random_amplitude", label: "Amplitude (kg)", type: "input" },
    {
  name: "random_angle",
  label: "Constant Angle / Fixed Position (°)",
  type: "input",}
  ]
},

// ======================================================
// CYCLING
// ======================================================
{
  type: "subheading",
  label: "Cycling",
  showIf: {
    field: "functional_exercises",
    includes: "cycling"
  }
},
{
  type: "subheading",
  label: "Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "cycling"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "cycling"
  },
  fields: [
    {
      name: "cycling_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "cycling_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "cycling_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "HUR System",
  showIf: {
    field: "functional_exercises",
    includes: "hur_system"
  }
},
{  type: "subheading",  label: "Parameters",  showIf: {    field: "functional_exercises",    includes: "hur_system"  }},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "hur_system"
  },
  fields: [
    {
      name: "hur_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "hur_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "hur_remarks",
      label: "Remarks",
      type: "input"
    },
    {
  name: "hur_other_exercise",
  label: "Other Exercise",
  type: "input",
    }
  ]
},

// ======================================================
// DAVID MACHINE
// ======================================================
{
  type: "subheading",
  label: "DAVID Machine",
  showIf: {
    field: "functional_exercises",
    includes: "david_machine"
  }
},

{
  name: "david_machine_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Lumbar Flexion", value: "lumbar_flexion" },
    { label: "Lumbar Extension", value: "lumbar_extension" },
    { label: "Lumbar Lateral Flexion", value: "lumbar_lateral_flexion" },
    { label: "Trunk Rotation", value: "trunk_rotation" },
    {
      label: "Cervical Flexion/Extension",
      value: "cervical_flexion_extension"
    },
    { label: "Cervical Rotation", value: "cervical_rotation" },
    {
      label: "Isometric Trunk Stabilization",
      value: "isometric_trunk_stabilization"
    },
    {
      label: "Progressive Resistance Spine Training",
      value: "progressive_resistance_spine_training"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "david_machine"
  }
},
{
  type: "subheading",
  label: "Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "david_machine"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "david_machine"
  },
  fields: [
    {
      name: "david_machine_weight",
      label: "Weight (kg/lbs)",
      type: "input"
    },
    {
      name: "david_machine_reps",
      label: "Repetitions",
      type: "input"
    },
    {
      name: "david_machine_sets",
      label: "Sets",
      type: "input"
    },
       {
      name: "david_machine_rest",
      label: "Rest",
      type: "input"
    },
    {
      name: "david_machine_compliance",
      label: "Compliance (%)",
      type: "input"
    },
    {
      name: "david_machine_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// ======================================================
// TREADMILL
// ======================================================

{
  type: "subheading",
  label: "Treadmill",
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  }
},
// {
//   type: "subheading",
//   label: "Parameters",
//   showIf: {
//     field: "functional_exercises",
//     includes: "treadmill"
//   }
// },

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  },
  fields: [
    {
      name: "treadmill_mode",
      label: "Mode",
      type: "input"
    },
    {
      name: "treadmill_duration",
      label: "Duration",
      type: "input"
    },
    {
      name: "treadmill_elevation",
      label: "Elevation",
      type: "input"
    },
    {
  name: "treadmill_remarks",
  label: "Remarks",
  type: "input",
    }
  ]
},

// ======================================================
// BIODEX ISOKINETIC
// ======================================================
{
  type: "subheading",
  label: "Biodex Isokinetic",
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  name: "biodex_region",
  label: "Region",
  type: "radio",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" },
    { label: "Forearm", value: "forearm" },
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Ankle", value: "ankle" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  name: "biodex_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  name: "biodex_exercise_type",
  label: "Types of Exercise",
  type: "radio",
  options: [
    { label: "Isokinetic", value: "isokinetic" },
    { label: "Isometric", value: "isometric" },
    { label: "Passive", value: "passive" },
    { label: "Isotonic", value: "isotonic" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  name: "biodex_protocols",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Knee Flexion/Extension (Various Speeds)",
      value: "knee_flexion_extension"
    },
    {
      label: "Shoulder Internal/External Rotation",
      value: "shoulder_internal_external_rotation"
    },
    {
      label: "Ankle Plantarflexion/Dorsiflexion",
      value: "ankle_plantarflexion_dorsiflexion"
    },
    {
      label: "Hip Flexion/Extension",
      value: "hip_flexion_extension"
    },
    {
      label: "Endurance Protocols",
      value: "endurance_protocols"
    },
    {
      label: "Power Training (High Speed)",
      value: "power_training"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},
{
  type: "subheading",
  label: "Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  },
  fields: [
    {
      name: "biodex_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "biodex_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// ======================================================
// MULTIPURPOSE GYM
// ======================================================
{
  type: "subheading",
  label: "Multipurpose Gym",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},

{
  name: "multipurpose_gym_exercise_type",
 
  type: "checkbox-group",
  options: [
    { label: "Lat Pulldown", value: "lat_pulldown" },
    { label: "Seated Row", value: "seated_row" },
    { label: "Chest Press", value: "chest_press" },
    { label: "Cable Crossover", value: "cable_crossover" },
    { label: "Triceps Pushdown", value: "triceps_pushdown" },
    { label: "Biceps Curl", value: "biceps_curl" },
    {
      label: "Functional Cable Training",
      value: "functional_cable_training"
    },
    { label: "Core Rotations", value: "core_rotations" },
    { label: "Assisted Pull-ups", value: "assisted_pullups" },
    {
      label: "Functional Movement Patterns",
      value: "functional_movement_patterns"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},
{
  type: "subheading",
  label: "Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  },
  fields: [
    {
      name: "multipurpose_gym_weight",
      label: "Weight (kg/lbs)",
      type: "input"
    },
    {
      name: "multipurpose_gym_reps",
      label: "Repetitions",
      type: "input"
    },
    {
      name: "multipurpose_gym_sets",
      label: "Sets",
      type: "input"
    },
     {
      name: "multipurpose_gym_hold",
      label: "Hold",
      type: "input"
    },
    {
      name: "multipurpose_gym_rest",
      label: "Rest",
      type: "input"
    },
    {
      name: "multipurpose_gym_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
   // ======================================================
// POWER PLATE
// ======================================================

{
  type: "subheading",
  label: "Power Plate",
  showIf: {
    field: "functional_exercises",
    includes: "power_plate"
  }
},

{
  name: "power_plate_mode",
  label: "Mode of Exercise",
  type: "radio",
  options: [
    { label: "Manual Mode", value: "manual_mode" },
    { label: "Single Movements", value: "single_movements" },
    { label: "Physical Rehab", value: "physical_rehab" },
    { label: "Complete Program", value: "complete_program" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "power_plate"
  }
},

// ======================================================
// MANUAL MODE
// ======================================================

{
  type: "subheading",
  label: "Manual Mode",
  showIf: {
    field: "power_plate_mode",
    equals: "manual_mode"
  }
},

{ type: "row", showIf: { field: "power_plate_mode", equals: "manual_mode" }, fields: [
  { name: "power_plate_manual_time", label: "Time", type: "input" },
  { name: "power_plate_manual_vibration_level", label: "Vibration Level", type: "input" },
]},

{
  name: "power_plate_manual_cable_resistance",
  label: "Cable Resistance",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "manual_mode"
  }
},

// ======================================================
// SINGLE MOVEMENTS
// ======================================================

{
  type: "subheading",
  label: "Single Movements",
  showIf: {
    field: "power_plate_mode",
    equals: "single_movements"
  }
},

{
  name: "power_plate_single_movement_type",
  label: "Movement Type",
  type: "radio",
  options: [
    { label: "Stretch", value: "stretch" },
    { label: "Balance", value: "balance" },
    { label: "Core", value: "core" },
    { label: "Strength", value: "strength" },
    { label: "Massage", value: "massage" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "single_movements"
  }
},

{ type: "row", showIf: { field: "power_plate_mode", equals: "single_movements" }, fields: [
  { name: "power_plate_single_exercise", label: "Type of Exercise", type: "input" },
  { name: "power_plate_single_time", label: "Time", type: "input" },
]},
{ type: "row", showIf: { field: "power_plate_mode", equals: "single_movements" }, fields: [
  { name: "power_plate_single_vibration_level", label: "Vibration Level", type: "input" },
]},

// ======================================================
// PHYSICAL REHAB
// ======================================================

{
  type: "subheading",
  label: "Physical Rehab",
  showIf: {
    field: "power_plate_mode",
    equals: "physical_rehab"
  }
},

{
  name: "power_plate_rehab_region",
  label: "Region",
  type: "checkbox-group",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow / Wrist", value: "elbow_wrist" },
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Cervical Spine", value: "cervical_spine" },
    { label: "Thoracic Spine", value: "thoracic_spine" },
    { label: "Lumbar Spine", value: "lumbar_spine" },
    { label: "Ankle", value: "ankle" },
    { label: "Foot", value: "foot" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "physical_rehab"
  }
},

{ type: "row", showIf: { field: "power_plate_mode", equals: "physical_rehab" }, fields: [
  { name: "power_plate_rehab_vibration", label: "Vibration Level", type: "input" },
  { name: "power_plate_rehab_time", label: "Time", type: "input" },
]},

// ======================================================
// COMPLETE PROGRAM
// ======================================================

{
  type: "subheading",
  label: "Complete Program",
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

{
  name: "power_plate_complete_category",
  label: "Program Category",
  type: "radio",
  options: [
    { label: "Neuro Health", value: "neuro_health" },
    { label: "Pain Relief", value: "pain_relief" },
    { label: "Common Condition", value: "common_condition" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

// Neuro Health Programs
{
  name: "power_plate_neuro_program",
  label: "Neuro Health Program",
  type: "radio",
  options: [
    { label: "Fall Prevention", value: "fall_prevention" },
    { label: "Neurodegen", value: "neurodegen" },
    { label: "SCI", value: "sci" },
    { label: "Biodensity (Pre-Post)", value: "biodensity" }
  ],
  showIf: {
    field: "power_plate_complete_category",
    equals: "neuro_health"
  }
},

// Pain Relief Programs
{
  name: "power_plate_pain_program",
  label: "Pain Relief Program",
  type: "radio",
  options: [
    { label: "LBP", value: "lbp" },
    { label: "Neck or Upper Back", value: "neck_upper_back" },
    { label: "Legs", value: "legs" },
    { label: "Arms", value: "arms" }
  ],
  showIf: {
    field: "power_plate_complete_category",
    equals: "pain_relief"
  }
},

// Common Condition Programs
{
  name: "power_plate_common_program",
  label: "Common Condition Program",
  type: "radio",
  options: [
    { label: "Flexibility", value: "flexibility" },
    { label: "Neuropathy", value: "neuropathy" },
    { label: "Circulation", value: "circulation" },
    { label: "Aid Therapy", value: "aid_therapy" },
    { label: "Strong Bones", value: "strong_bones" }
  ],
  showIf: {
    field: "power_plate_complete_category",
    equals: "common_condition"
  }
},

{ type: "row", showIf: { field: "power_plate_mode", equals: "complete_program" }, fields: [
  { name: "power_plate_complete_vibration_level", label: "Vibration Level", type: "input" },
  { name: "power_plate_complete_time", label: "Time", type: "input" },
]},

{ type: "row", showIf: { field: "functional_exercises", includes: "power_plate" }, fields: [
  { name: "power_plate_remarks", label: "Remarks", type: "input" },
]},
// ======================================================
// D WALL
// ======================================================

{
  type: "subheading",
  label: "D Wall",
  showIf: {
    field: "functional_exercises",
    includes: "d_wall"
  }
},

{
  name: "d_wall_mode",
  label: "Mode",
  type: "radio",
  options: [
    {
      label: "Training Library",
      value: "training_library"
    },
    {
      label: "Exer Games",
      value: "exer_games"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "d_wall"
  }
},


// ======================================================
// TRAINING LIBRARY
// ======================================================

{
  type: "subheading",
  label: "Training Library",
  showIf: {
    field: "d_wall_mode",
    equals: "training_library"
  }
},

{
  name: "d_wall_training_library",
  
  type: "checkbox-group",
  options: [
    { label: "Balance", value: "balance" },
    { label: "Strength", value: "strength" },
    { label: "Endurance", value: "endurance" },
    { label: "Mobility", value: "mobility" },
    { label: "Agility", value: "agility" }
  ],
  showIf: {
    field: "d_wall_mode",
    equals: "training_library"
  }
},

{
  type: "row",
  showIf: {
    field: "d_wall_training_library",
    includes: "balance"
  },
  fields: [
    {
      name: "d_wall_balance",
      label: "Balance",
      type: "input",
      rows: 2
    },
    {
      name: "d_wall_strength",
      label: "Strength",
      type: "input",
      rows: 2,
      showIf: {
        field: "d_wall_training_library",
        includes: "strength"
      }
    },
    {
      name: "d_wall_endurance",
      label: "Endurance",
      type: "input",
      rows: 2,
      showIf: {
        field: "d_wall_training_library",
        includes: "endurance"
      }
    }
  ]
},
{
  type: "row",
  showIf: {
    field: "d_wall_training_library",
    includes: "mobility"
  },
  fields: [
    {
      name: "d_wall_mobility",
      label: "Mobility",
      type: "input",
      rows: 2
    },
    {
      name: "d_wall_agility",
      label: "Agility",
      type: "input",
      rows: 2
    }
  ]
},
{
  type: "row",
  showIf: {
    field: "d_wall_mode",
    equals: "training_library"
  },
  fields: [
    {
      name: "d_wall_training_parameters",
      label: "Repetitions / Series / Time / Loads",
      type: "input",
      rows: 3
    },
    {
      name: "d_wall_training_final_score",
      label: "Final Score",
      type: "input"
    },
    {
      name: "d_wall_training_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// ======================================================
// EXER GAMES
// ======================================================

{
  type: "subheading",
  label: "Exer Games",
  showIf: {
    field: "d_wall_mode",
    equals: "exer_games"
  }
},

{
  name: "d_wall_exer_games",
 
  type: "checkbox-group",
  options: [
    { label: "Equilibrium", value: "equilibrium" },
    { label: "Ski", value: "ski" },
    { label: "Fly", value: "fly" },
    { label: "Shooting Range", value: "shooting_range" },
    { label: "Fruit Cutter", value: "fruit_cutter" },
    { label: "Shelf", value: "shelf" },
    { label: "Library", value: "library" },
    { label: "Move", value: "move" },
    { label: "Navigation", value: "navigation" },
    { label: "Upper Limbs", value: "upper_limbs" },
    { label: "Freewalk", value: "freewalk" },
    {
      label: "Occupation Therapy",
      value: "occupation_therapy"
    }
  ],
  showIf: {
    field: "d_wall_mode",
    equals: "exer_games"
  }
},

{
  type: "row",
  showIf: {
    field: "d_wall_mode",
    equals: "exer_games"
  },
  fields: [
    {
      name: "d_wall_exer_games_parameters",
      label: "Time / Levels",
      type: "input",
      rows: 3
    },
    {
      name: "d_wall_exer_games_final_score",
      label: "Final Score",
      type: "input"
    },
    {
      name: "d_wall_exer_games_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
      // ======================================================
// SHUTTLE RECOVERY
// ======================================================

{
  type: "subheading",
  label: "Shuttle Recovery",
  showIf: {
    field: "functional_exercises",
    includes: "shuttle_recovery"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "shuttle_recovery"
  },
  fields: [
    {
      name: "shuttle_recovery_exercise_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "shuttle_recovery_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "shuttle_recovery_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// ======================================================
// DYACO ROWING
// ======================================================

{
  type: "subheading",
  label: "Dyaco Rowing",
  showIf: {
    field: "functional_exercises",
    includes: "dyaco_rowing"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "dyaco_rowing"
  },
  fields: [
    {
      name: "dyaco_rowing_exercise_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "dyaco_rowing_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "dyaco_rowing_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
      // ======================================================
// RECUMBENT BIKE (NORDICTRACK)
// ======================================================

{
  type: "subheading",
  label: "Recumbent Bike (NordicTrack)",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},

{
  name: "recumbent_bike_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Low-impact Cycling",
      value: "low_impact_cycling"
    },
    {
      label: "Interval Training",
      value: "interval_training"
    },
    {
      label: "Resistance Progression",
      value: "resistance_progression"
    },
    {
      label: "Cardiovascular Endurance",
      value: "cardiovascular_endurance"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},

{
  type: "subheading",
  label: "Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  },
  fields: [
    {
      name: "recumbent_bike_duration",
      label: "Duration (Min)",
      type: "input"
    },
    {
      name: "recumbent_bike_distance",
      label: "Distance (KM)",
      type: "input"
    },
    {
      name: "recumbent_bike_resistance",
      label: "Resistance Level",
      type: "input"
    }
  ]
},
{ type: "row", showIf: { field: "functional_exercises", includes: "recumbent_bike" }, fields: [
  { name: "recumbent_bike_remarks", label: "Remarks", type: "input" },
]},

      // ======================================================
// ELLIPTICAL EXERCISE MACHINE
// ======================================================

{
  type: "subheading",
  label: "Elliptical Exercise Machine",
  showIf: {
    field: "functional_exercises",
    includes: "elliptical_machine"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "elliptical_machine"
  },
  fields: [
    {
      name: "elliptical_machine_exercise_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "elliptical_machine_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "elliptical_machine_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},   
// ======================================================
// HUBER 360 BALANCE AND COORDINATION
// ======================================================

{
  type: "subheading",
  label: "Huber 360 Balance and Coordination",
  showIf: {
    field: "functional_exercises",
    includes: "huber_360"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "huber_360"
  },
  fields: [
    {
      name: "huber_360_exercise_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "huber_360_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "huber_360_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// ======================================================
// NEOFECT SMART BALANCE
// ======================================================

{
  type: "subheading",
  label: "Neofect Smart Balance",
  showIf: {
    field: "functional_exercises",
    includes: "neofect_smart_balance"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "neofect_smart_balance"
  },
  fields: [
    {
      name: "neofect_smart_balance_exercise_type",
      label: "Type of Exercise",
      type: "input"
    },
    {
      name: "neofect_smart_balance_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number"
    },
    {
      name: "neofect_smart_balance_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

      {
  type: "subheading",
  label: "Sidra Leg",
  showIf: {
    field: "functional_exercises",
    includes: "sidra_leg"
  }
},
{
  name: "sidra_leg_training_type",
  label: "Training Type",
  type: "checkbox-group",
  options: [
    { label: "CPM Knee", value: "cpm_knee" },
    { label: "CPM Ankle", value: "cpm_ankle" },
    { label: "CPM Knee with Synced Ankle", value: "cpm_knee_synced_ankle" },
    { label: "CPM Knee Progressive", value: "cpm_knee_progressive" },
    { label: "CPM Ankle Progressive", value: "cpm_ankle_progressive" },
    { label: "CPM Knee with Synced Ankle Progressive", value: "cpm_knee_synced_ankle_progressive" },
    { label: "CPM + EMG Knee", value: "cpm_emg_knee" },
    { label: "CPM + EMG Ankle", value: "cpm_emg_ankle" },
    { label: "CPM + EMG Knee with Synced Ankle", value: "cpm_emg_knee_synced_ankle" },
    { label: "CPM + EMS Knee", value: "cpm_ems_knee" },
    { label: "CPM + EMS Ankle", value: "cpm_ems_ankle" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "sidra_leg"
  }
},
{ type: "row", showIf: { field: "sidra_leg_training_type", includes: "others" }, fields: [
  { name: "sidra_leg_training_type_other", label: "Other Training Type", type: "input" },
]},
{ type: "row", showIf: { field: "functional_exercises", includes: "sidra_leg" }, fields: [
  { name: "sidra_leg_time_repetition", label: "Time / Repetition", type: "input" },
]},

{
  name: "sidra_leg_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "sidra_leg"
  }
},
{ type: "row", showIf: { field: "functional_exercises", includes: "sidra_leg" }, fields: [
  { name: "sidra_leg_remarks", label: "Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "functional_exercises", includes: "others" }, fields: [
  { name: "functional_exercises_other", label: "Other Functional Exercise", type: "input" },
]},
      ]
    },

    

    // =========================
    // THERAPEUTIC MODALITIES (FIXED AS SEPARATE SECTION)
    // =========================
    
  ]
};


const ASSESSMENT_SCHEMA = {
  title: "Assessment & Response",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },


      
    ],
  }],
};

const PLAN_SCHEMA = {
  title: "Plan",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      title: "Therapist Notes",
      fields: [
         { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
            type: "dynamic-goals",
            name: "short_term_goals"
          },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          },  

        // ======================================================
        // THERAPIST NOTES
        // ======================================================

        {
          name: "therapist_notes",
          
          type: "checkbox-group",
          options: [
            {
              label: "Continue Current Therapy Program",
              value: "continue_current_therapy"
            },
            {
              label: "Therapy Progression Based on Functional Level",
              value: "therapy_progression"
            },
            {
              label: "Review and Revisit of Therapy Plan",
              value: "review_revisit_therapy_plan"
            },
            {
              label: "Others",
              value: "others"
            }
          ]
        },

        // ======================================================
        // CONTINUE CURRENT THERAPY PROGRAM
        // ======================================================

        {
          type: "subheading",
          label: "Continue Current Therapy Program",
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_therapy"
          }
        },

        {
          name: "continue_current_therapy_options",
          
          type: "checkbox-group",
          options: [
            {
              label: "Continue Pain Management Program",
              value: "continue_pain_management"
            },
            {
              label: "Continue Manual Therapy",
              value: "continue_manual_therapy"
            },
            {
              label: "Continue Therapeutic Exercises",
              value: "continue_therapeutic_exercises"
            },
            {
              label: "Continue Functional Exercises",
              value: "continue_functional_exercises"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_therapy"
          }
        },

        {
          name: "continue_current_therapy_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_therapy"
          }
        },

        // ======================================================
        // THERAPY PROGRESSION
        // ======================================================

        {
          type: "subheading",
          label: "Therapy Progression Based on Functional Level",
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        {
          name: "therapy_progression_options",
        
          type: "checkbox-group",
          options: [
            {
              label: "Therapeutic Exercise Progression",
              value: "therapeutic_exercise_progression"
            },
            {
              label: "Functional Exercise Progression",
              value: "functional_exercise_progression"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        {
          name: "therapy_progression_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        // ======================================================
        // REVIEW & REVISIT
        // ======================================================

        {
          type: "subheading",
          label: "Review and Revisit of Therapy Plan",
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy_plan"
          }
        },

        {
          name: "review_revisit_options",
         
          type: "checkbox-group",
          options: [
            {
              label: "Review Pain Management Program",
              value: "review_pain_management"
            },
            {
              label: "Review of Therapeutic Exercises",
              value: "review_therapeutic_exercises"
            },
            {
              label: "Review of Functional Exercises",
              value: "review_functional_exercises"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy_plan"
          }
        },

        {
          name: "review_revisit_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy_plan"
          }
        },

        // ======================================================
        // OTHERS
        // ======================================================

        

        {
          name: "plan_others",
          label: "Others",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "others"
          }
        },

        {
          name: "plan_others_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "others"
          }
        },
        {
  name: "functional_exercises_other",
  label: "Others",
  type: "input",
  showIf: {
    field: "functional_exercises",
    includes: "others"
  }
},


      ]
    }
  ]
};



const SOAP_TABS = [
  { key: "subjective",    label: "Subjective"    },
  { key: "objective",     label: "Objective"     },
 
  { key: "assessment",    label: "Assessment"    },
  { key: "plan",          label: "Plan"          },
];

const SCHEMA_MAP = {
  subjective:   SUBJECTIVE_SCHEMA,
  objective:    OBJECTIVE_SCHEMA,
 
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function MSDProgress({ patient, onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);
  const [patientHistory, setPatientHistory] = useState({
      past_medical_history: "",
      past_family_history: "",
      alerts_and_allergies: ""
    });
    useEffect(() => {
          if (!patient) return;
          setPatientHistory({
            past_medical_history: patient.medical_history || "",
            past_family_history: patient.family_medical_history || "",
            alerts_and_allergies: patient.alerts_and_allergies_history || ""
          });
        }, [patient]);

  const storageKey = patient ? `amputee_progress_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);
   useEffect(() => {
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
          }
        }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      session_date: v.session_date || new Date().toISOString().split("T")[0],
    }));
  }, [patient]);
const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));

  // const handleAction = (type) => {
  //   if (type === "clear") setValues({});
  //   if (type === "save") {
  //     if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
  //     alert("Progress & Intervention saved.");
  //   }
  // };
    const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }
    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Spinal draft saved");
    }
  };
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const safe = (v) => v ?? "-";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
           <h3>Patient History</h3>
        
                  <div>
                    <b>Past Medical History</b>
                    <input
                      style={input}
                      value={patientHistory.past_medical_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_medical_history: e.target.value
                        }))
                      }
                    />
                  </div>

          
          <div>
                    <b>Family History</b>
                    <input
                      style={input}
                      value={patientHistory.past_family_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_family_history: e.target.value
                        }))
                      }
                    />
                  </div>

        
           <div>
                    <b>Allergies</b>
                    <input
                      style={input}
                      value={patientHistory.alerts_and_allergies}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          alerts_and_allergies: e.target.value
                        }))
                      }
                    />
                  </div>

          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}
  return (
    <div>
      {/* Patient Information */}
         <CommonFormBuilder
                schema={{ title: "Patient Information", sections: [] }}
                values={{}}
                onChange={() => {}}
              >
                <PatientInformationBlock
                  patient={patient}
                  patientHistory={patientHistory}
                  setPatientHistory={setPatientHistory}
                />
              
                <button style={doctorsReportBtn}>
                  Doctors Reports
                </button>
              </CommonFormBuilder>
      

      {/* SOAP-style Tabs */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div
            key={tab.key}
            style={activeTab === tab.key ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <CommonFormBuilder
        schema={SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
      <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>

    </div>
  );
}

/* ── Styles ── */
const tabBar    = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const backBtn   = { marginTop: 10, padding: "8px 18px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer" };
const input = {
          width: "100%",
          minHeight: 90,
          marginTop: 6,
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: 14,
          resize: "vertical"
};
const alertBtn = {
  marginTop: 10,
          padding: "10px 20px",
          borderRadius: 6,
          border: "1.5px solid #007bff",
          background: "#007bff",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
};
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8
};
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};