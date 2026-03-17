import React, { useState, useMemo, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ---------------- DATA ---------------- */

const dermatomes = [
  "C2", "C3", "C4", "C5", "C6", "C7", "C8",
  "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
  "L1", "L2", "L3", "L4", "L5",
  "S1", "S2", "S3", "S4-5",
];

const keyMuscles = [
  { level: "C5", muscle: "Elbow flexors" },
  { level: "C6", muscle: "Wrist extensors" },
  { level: "C7", muscle: "Elbow extensors" },
  { level: "C8", muscle: "Finger flexors" },
  { level: "T1", muscle: "Finger abductors" },
  { level: "L2", muscle: "Hip flexors" },
  { level: "L3", muscle: "Knee extensors" },
  { level: "L4", muscle: "Ankle dorsiflexors" },
  { level: "L5", muscle: "Long toe extensors" },
  { level: "S1", muscle: "Ankle plantar flexors" },
];

/* Right section first (Right Motor, Right LT, Right PP), then Left section (Left LT, Left PP, Left Motor) */
const SIX_COLUMNS = ["Right Motor", "Right LT", "Right PP", "Left LT", "Left PP", "Left Motor"];

const MOTOR_KEY_LEVELS = new Set(["C5","C6","C7","C8","T1","L2","L3","L4","L5","S1"]);
const UPPER_MOTOR_LEVELS = ["C5","C6","C7","C8","T1"];
const LOWER_MOTOR_LEVELS = ["L2","L3","L4","L5","S1"];

// Summary score fields used by score-boxes
const SCORE_BOX_KEYS = [
  // Motor subscores
  "asia_uer", "asia_uel", "asia_uems_total",
  "asia_ler", "asia_lel", "asia_lems_total",
  // Sensory subscores
  "asia_ltr", "asia_ltl", "asia_lt_total",
  "asia_ppr", "asia_ppl", "asia_pp_total",
];

function buildInitialValues() {
  const out = {};
  dermatomes.forEach(level => {
    SIX_COLUMNS.forEach(h => {
      out[`asia_${level}_${h}`] = "";
    });
  });
  SCORE_BOX_KEYS.forEach(k => { out[k] = 0; });
  return out;
}

const initialValues = buildInitialValues();

const MOTOR_OPTIONS = ["0", "1", "2", "3", "4", "5", "NT"];
const SENSORY_OPTIONS = ["0", "1", "2", "NT"];

const asiaSchema = {
  title: "",
  sections: [
    {
      fields: [
        {
          type: "custom-image",
          label: "Dermatome Map",
          src: "/asia-body.png",
          maxHeight: 900,
        },
        {
          type: "grid-table-flat",
          name: "asia",
          label: "",
          headers: SIX_COLUMNS,
          rows: dermatomes.map(level => ({ key: level, label: level })),
          labelWidth: "48px",
          inputWidth: "1fr",
          boxWidth: "100%",
          headerOptions: {
            "Right Motor": MOTOR_OPTIONS,
            "Left Motor": MOTOR_OPTIONS,
            "Right LT": SENSORY_OPTIONS,
            "Right PP": SENSORY_OPTIONS,
            "Left LT": SENSORY_OPTIONS,
            "Left PP": SENSORY_OPTIONS,
          },
          hiddenCells: (rowKey, header) => {
            if (header === "Right Motor" || header === "Left Motor") {
              return !MOTOR_KEY_LEVELS.has(rowKey);
            }
            return false;
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "asia_vac",
              label: "Voluntary Anal Contraction (VAC)",
              type: "radio",
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
            },
            {
              name: "asia_dap",
              label: "Deep Anal Pressure (DAP)",
              type: "radio",
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
            },
          ],
        },
        { type: "subheading", label: "Motor Subscores" },
        {
          type: "row",
          fields: [
            {
              type: "score-box",
              name: "asia_uer",
              label: "UER",
              info: "Upper Extremity Right (Max 25)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_uel",
              label: "UEL",
              info: "Upper Extremity Left (Max 25)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_uems_total",
              label: "UEMS Total",
              info: "UER + UEL (Max 50)",
              readOnly: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              type: "score-box",
              name: "asia_ler",
              label: "LER",
              info: "Lower Extremity Right (Max 25)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_lel",
              label: "LEL",
              info: "Lower Extremity Left (Max 25)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_lems_total",
              label: "LEMS Total",
              info: "LER + LEL (Max 50)",
              readOnly: true,
            },
          ],
        },
        { type: "subheading", label: "Sensory Subscores" },
        {
          type: "row",
          fields: [
            {
              type: "score-box",
              name: "asia_ltr",
              label: "LTR",
              info: "Light Touch Right (Max 56)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_ltl",
              label: "LTL",
              info: "Light Touch Left (Max 56)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_lt_total",
              label: "LT Total",
              info: "LTR + LTL (Max 112)",
              readOnly: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              type: "score-box",
              name: "asia_ppr",
              label: "PPR",
              info: "Pin Prick Right (Max 56)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_ppl",
              label: "PPL",
              info: "Pin Prick Left (Max 56)",
              readOnly: true,
            },
            {
              type: "score-box",
              name: "asia_pp_total",
              label: "PP Total",
              info: "PPR + PPL (Max 112)",
              readOnly: true,
            },
          ],
        },
        { type: "subheading", label: "Neurological Levels" },

        {
          type: "row",
          fields: [
            {
              name: "asia_summary_nli",
              label: "3. Neurological Level of Injury (NLI)",
              type: "input",
            },
            {
              name: "asia_summary_complete",
              label: "4. Complete or Incomplete?",
              type: "input",
            },
            {
              name: "asia_summary_ais",
              label: "5. ASIA Impairment Scale (AIS)",
              type: "input",
            },
          ],
        },

        {
          type: "grid-table-flat",
          name: "asia_neuro_levels",
          label: "Neurological Levels / ZPP",
          headers: ["Right", "Left"],
          rows: [
            { key: "sensory", label: "SENSORY" },
            { key: "motor", label: "MOTOR" },
            { key: "zpp_sensory", label: "ZONE OF PARTIAL PRESERVATION SENSORY" },
            { key: "zpp_motor", label: "ZONE OF PARTIAL PRESERVATION MOTOR" },
          ],
          labelWidth: "260px",
          inputWidth: "1fr",
          boxWidth: "100%",
        },
      ],
    },
  ],
};

/* ---------------- COMPONENT ---------------- */

export default function SpinalcordInjury() {
  const [values, setValues] = useState(initialValues);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const parseScore = v => (Number.isFinite(+v) ? +v : 0);

  // Compute totals from grid and write into values so schema score-boxes display them (same pattern as FMA-LE)
  const gridSnapshot = JSON.stringify(
    dermatomes.flatMap(level => SIX_COLUMNS.map(h => values[`asia_${level}_${h}`]))
  );
  useEffect(() => {
    let rLT = 0, lLT = 0, rPP = 0, lPP = 0;
    let rUER = 0, rLER = 0, lUER = 0, lLER = 0;

    dermatomes.forEach(level => {
      const rMv = parseScore(values[`asia_${level}_Right Motor`]);
      const lMv = parseScore(values[`asia_${level}_Left Motor`]);
      rLT += parseScore(values[`asia_${level}_Right LT`]);
      lLT += parseScore(values[`asia_${level}_Left LT`]);
      rPP += parseScore(values[`asia_${level}_Right PP`]);
      lPP += parseScore(values[`asia_${level}_Left PP`]);
      if (UPPER_MOTOR_LEVELS.includes(level)) {
        rUER += rMv;
        lUER += lMv;
      } else if (LOWER_MOTOR_LEVELS.includes(level)) {
        rLER += rMv;
        lLER += lMv;
      }
    });

    setValues(prev => ({
      ...prev,
      asia_uer: rUER,
      asia_uel: lUER,
      asia_uems_total: rUER + lUER,
      asia_ler: rLER,
      asia_lel: lLER,
      asia_lems_total: rLER + lLER,
      asia_ltr: rLT,
      asia_ltl: lLT,
      asia_lt_total: rLT + lLT,
      asia_ppr: rPP,
      asia_ppl: lPP,
      asia_pp_total: rPP + lPP,
    }));
  }, [gridSnapshot]);

  const tableWrapStyle = { overflowX: "auto", maxWidth: "100%" };

  return (
    <div style={{ width: "100%", padding: 8, fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "left", marginBottom: 12, fontSize: 18 }}>ASIA / ISNCSCI Assessment</h2>

      <div style={tableWrapStyle}>
        <CommonFormBuilder
          schema={asiaSchema}
          values={values}
          onChange={onChange}
          layout="nested"
        />
      </div>
    </div>
  );
}
