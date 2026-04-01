import React, { useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PainAssessmentForm from "./PainAssessmentForm";
import SpinalcordInjury from "./SpinalcordInjury";
import humanBodyImage from "../../../assets/Human Body.jpg";
import PTROMForm from "../../PT/components/ROMForm";
import PTMASForm from "../../PT/components/MASForm";

export default function Physical({ onChange }) {
  const [values, setValues] = useState({
    is_sci_selected: false,
    // Default both sides selected for compact "side selector" views.
    // Start unselected (checkboxes unchecked); per-side radios appear only after side selection.
    pe_muscle_bulk_side: [],
    pe_posture_side: [],
    pe_deformity_side: [],
    pe_scars_side: [],
    pe_muscle_tone_side: [],
  });

  const styles = {
    container: {
      width: "100%",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    contentCard: {
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
    },
  };

  const CATEGORY_LABELS = {
    spine: "Spine",
    upper_limb: "Upper Limb",
    lower_limb: "Lower Limb",
    stroke: "Stroke",
    sci: "Spinal Cord Injury (SCI)",
    amputation: "Amputation",
  };

  function MRCScaleForm({ values, onChange }) {
    const strengthOptions = [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "Not applicable", label: "Not applicable" },
    ];

    const GROUPS = [
      {
        title: "Shoulder",
        rows: [
          { key: "shoulder_flexor", label: "Shoulder flexor" },
          { key: "shoulder_abductor", label: "Shoulder abductor" },
        ],
      },
      {
        title: "Elbow",
        rows: [
          { key: "elbow_flexor", label: "Elbow flexor" },
          { key: "elbow_extensor", label: "Elbow extensor" },
        ],
      },
      {
        title: "Wrist",
        rows: [
          { key: "wrist_flexor", label: "Wrist flexor" },
          { key: "wrist_extensor", label: "Wrist extensor" },
        ],
      },
      {
        title: "Finger",
        rows: [
          { key: "finger_flexor", label: "Finger flexor" },
          { key: "finger_extensor", label: "Finger extensor" },
        ],
      },
      {
        title: "Hip",
        rows: [
          { key: "hip_flexor", label: "Hip flexor" },
          { key: "hip_extensor", label: "Hip extensor" },
        ],
      },
      {
        title: "Knee",
        rows: [
          { key: "knee_flexor", label: "Knee flexor" },
          { key: "knee_extensor", label: "Knee extensor" },
        ],
      },
      {
        title: "Ankle",
        rows: [
          { key: "ankle_dorsiflexor", label: "Ankle dorsiflexor" },
          { key: "ankle_plantarflexor", label: "Ankle plantarflexor" },
        ],
      },
    ];

    const regionArr = Array.isArray(values?.region)
      ? values?.region
      : values?.region
        ? [values?.region]
        : [];

    const categoryArr = Array.isArray(values?.category)
      ? values?.category
      : values?.category
        ? [values?.category]
        : [];

    const isAmputation = categoryArr.includes("amputation");
    const normalizedAmpLowerLimbLocation =
      typeof values?.amp_lower_limb_location === "string"
        ? values?.amp_lower_limb_location.trim()
        : values?.amp_lower_limb_location;
    const normalizedAmpUpperLimbLocation =
      typeof values?.amp_upper_limb_location === "string"
        ? values?.amp_upper_limb_location.trim()
        : values?.amp_upper_limb_location;

    // Show only the MRC sections relevant to the selected region(s).
    const wantedTitles = (() => {
      const hasUpper = regionArr.includes("upper_limb");
      const hasLower = regionArr.includes("lower_limb");

      // If amputation is hip disortation, hide the entire MRC.
      if (
        isAmputation &&
        (normalizedAmpLowerLimbLocation === "hip_disortation" ||
          normalizedAmpUpperLimbLocation === "shoulder_disortation")
      )
        return [];

      // If nothing is selected in Region, show the entire MRC form.
      if (!regionArr.length) return GROUPS.map((g) => g.title);

      // Amputation-specific MRC display rules (upper + lower) based on location selections.
      if (isAmputation) {
        let wantedUpper = [];
        let wantedLower = [];

        if (hasUpper) {
          if (normalizedAmpUpperLimbLocation === "above_elbow") wantedUpper = ["Shoulder"];
          else if (normalizedAmpUpperLimbLocation === "below_elbow") wantedUpper = ["Shoulder", "Elbow"];
          else if (normalizedAmpUpperLimbLocation === "rays_amputation")
            wantedUpper = ["Shoulder", "Elbow", "Wrist"];
          else if (normalizedAmpUpperLimbLocation === "carpal_metacarpal")
            wantedUpper = ["Shoulder", "Elbow", "Wrist"];
          else wantedUpper = ["Shoulder", "Elbow", "Wrist", "Finger"];
        }

        if (hasLower) {
          if (normalizedAmpLowerLimbLocation === "above_knee") wantedLower = ["Hip"];
          else if (normalizedAmpLowerLimbLocation === "below_knee") wantedLower = ["Hip", "Knee"];
          else if (normalizedAmpLowerLimbLocation === "rays_amputation")
            wantedLower = ["Hip", "Knee", "Ankle"];
          else if (normalizedAmpLowerLimbLocation === "tarsal_metatarsal")
            wantedLower = ["Hip", "Knee", "Ankle"];
          else wantedLower = ["Hip", "Knee", "Ankle"];
        }

        // If both upper and lower are selected, return union of the relevant groups.
        return [...wantedUpper, ...wantedLower];
      }

      if (hasUpper && hasLower) return GROUPS.map((g) => g.title);
      if (hasUpper) return ["Shoulder", "Elbow", "Wrist", "Finger"];
      if (hasLower) return ["Hip", "Knee", "Ankle"];

      return GROUPS.map((g) => g.title);
    })();

    const visibleGroups = GROUPS.filter((g) => wantedTitles.includes(g.title));
    const showAnkleNote =
      isAmputation && normalizedAmpLowerLimbLocation === "tarsal_metatarsal" && wantedTitles.includes("Ankle");
    const showWristNote =
      isAmputation &&
      normalizedAmpUpperLimbLocation === "carpal_metacarpal" &&
      wantedTitles.includes("Wrist");

    if (!visibleGroups.length) return null;

    return (
      <div style={{ width: "100%" }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>MRC</div>
        {showAnkleNote && (
          <div
            style={{
              marginBottom: 12,
              padding: "8px 10px",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              background: "#eff6ff",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            Fill Ankle if Required, not mandatory
          </div>
        )}
        {showWristNote && (
          <div
            style={{
              marginBottom: 12,
              padding: "8px 10px",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              background: "#eff6ff",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            Fill Wrist only if needed it is not mandatory
          </div>
        )}

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>MRC</th>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Right</th>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Left</th>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Specify</th>
              </tr>
            </thead>
            <tbody>
              {visibleGroups.flatMap((g) => {
                const sectionRow = (
                  <tr key={`section_${g.title}`}>
                    <td
                      colSpan={4}
                      style={{
                        padding: "10px 8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: 800,
                        background: "#f8fafc",
                      }}
                    >
                      {g.title}
                    </td>
                  </tr>
                );

                const dataRows = g.rows.map((r) => {
                  const rightName = `mrc_${r.key}_right`;
                  const leftName = `mrc_${r.key}_left`;
                  const specifyName = `mrc_${r.key}_specify`;
                  return (
                    <tr key={r.key}>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9", fontWeight: 700 }}>
                        {r.label}
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9" }}>
                        <select
                          value={values[rightName] || ""}
                          onChange={(e) => onChange(rightName, e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            background: "#fff",
                          }}
                        >
                          <option value="">Select</option>
                          {strengthOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9" }}>
                        <select
                          value={values[leftName] || ""}
                          onChange={(e) => onChange(leftName, e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            background: "#fff",
                          }}
                        >
                          <option value="">Select</option>
                          {strengthOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9" }}>
                        <input
                          type="text"
                          value={values[specifyName] || ""}
                          onChange={(e) => onChange(specifyName, e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            background: "#fff",
                          }}
                        />
                      </td>
                    </tr>
                  );
                });

                return [sectionRow, ...dataRows];
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  function MyotomeTestingForm({ values, onChange }) {
    const strengthOptions = [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "NT", label: "NT" },
    ];

    const rows = [
      { key: "C5", label: "Elbow flexors (C5)", limb: "upper_limb" },
      { key: "C6", label: "Wrist extensors (C6)", limb: "upper_limb" },
      { key: "C7", label: "Elbow extensors (C7)", limb: "upper_limb" },
      { key: "C8", label: "Finger flexors (C8)", limb: "upper_limb" },
      { key: "T1", label: "Finger abductors (T1)", limb: "upper_limb" },

      { key: "L2", label: "Hip flexors (L2)", limb: "lower_limb" },
      { key: "L3", label: "Knee extensors (L3)", limb: "lower_limb" },
      { key: "L4", label: "Ankle dorsiflexors (L4)", limb: "lower_limb" },
      { key: "L5", label: "Long toe extensors (L5)", limb: "lower_limb" },
      { key: "S1", label: "Ankle plantar flexors (S1)", limb: "lower_limb" },
    ];

    const regionArr = Array.isArray(values?.region)
      ? values?.region
      : values?.region
        ? [values?.region]
        : [];

    const categoryArr = Array.isArray(values?.category)
      ? values?.category
      : values?.category
        ? [values?.category]
        : [];
    const isAmputation = categoryArr.includes("amputation");

    const normalizedAmpLowerLimbLocation =
      typeof values?.amp_lower_limb_location === "string"
        ? values?.amp_lower_limb_location.trim()
        : values?.amp_lower_limb_location;

    const normalizedAmpUpperLimbLocation =
      typeof values?.amp_upper_limb_location === "string"
        ? values?.amp_upper_limb_location.trim()
        : values?.amp_upper_limb_location;

    // Default: show all myotomes if Region isn't selected.
    let visibleRows = rows;
    let showS1Note = false;
    let showC8T1Note = false;

    if (!regionArr.length) {
      visibleRows = rows;
    } else {
      const hasUpper = regionArr.includes("upper_limb");
      const hasLower = regionArr.includes("lower_limb");

      // If amputation location is disarticulation -> hide entire myotome.
      if (
        isAmputation &&
        (normalizedAmpLowerLimbLocation === "hip_disortation" ||
          normalizedAmpUpperLimbLocation === "shoulder_disortation")
      ) {
        visibleRows = [];
      } else if (isAmputation) {
        let upperRows = [];
        let lowerRows = [];

        // Upper limb amputation location rules (when Upper Limb is selected).
        if (hasUpper) {
          if (normalizedAmpUpperLimbLocation === "above_elbow") {
            upperRows = rows.filter((r) => r.key === "C5");
          } else if (normalizedAmpUpperLimbLocation === "below_elbow") {
            upperRows = rows.filter((r) => r.key === "C5" || r.key === "C6" || r.key === "C7");
          } else if (normalizedAmpUpperLimbLocation === "rays_amputation") {
            upperRows = rows.filter((r) => r.key === "C5" || r.key === "C6" || r.key === "C7" || r.key === "C8" || r.key === "T1");
            showC8T1Note = true;
          } else if (normalizedAmpUpperLimbLocation === "carpal_metacarpal") {
            upperRows = rows.filter((r) => r.key === "C5" || r.key === "C6" || r.key === "C7");
          } else {
            // If location isn't selected yet, fall back to all upper-limb myotomes.
            upperRows = rows.filter((r) => r.limb === "upper_limb");
          }
        }

        // Lower limb amputation location rules (when Lower Limb is selected).
        if (hasLower) {
          if (normalizedAmpLowerLimbLocation === "above_knee") {
            lowerRows = rows.filter((r) => r.key === "L2" || r.key === "L3");
          } else if (normalizedAmpLowerLimbLocation === "below_knee") {
            lowerRows = rows.filter((r) => r.key === "L2" || r.key === "L3");
          } else if (normalizedAmpLowerLimbLocation === "rays_amputation") {
            lowerRows = rows.filter((r) => r.key === "L2" || r.key === "L3" || r.key === "L4" || r.key === "S1");
          } else if (normalizedAmpLowerLimbLocation === "tarsal_metatarsal") {
            lowerRows = rows.filter((r) => r.key === "L2" || r.key === "L3" || r.key === "L4" || r.key === "S1");
            showS1Note = true;
          } else {
            // If location isn't selected yet, fall back to all lower-limb myotomes.
            lowerRows = rows.filter((r) => r.limb === "lower_limb");
          }
        }

        visibleRows = [...upperRows, ...lowerRows];
      } else if (hasUpper && hasLower) {
        // For non-amputation cases, keep original behavior.
        visibleRows = rows;
      } else if (hasUpper) {
        visibleRows = rows.filter((r) => r.limb === "upper_limb");
      } else if (hasLower) {
        visibleRows = rows.filter((r) => r.limb === "lower_limb");
      }
    }

    return (
      <div style={{ width: "100%" }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Myotome</div>

        {showC8T1Note && (
          <div
            style={{
              marginBottom: 12,
              padding: "8px 10px",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              background: "#eff6ff",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            fill c8,t1 only if needed it is not mandatory
          </div>
        )}

        {showS1Note && (
          <div
            style={{
              marginBottom: 12,
              padding: "8px 10px",
              border: "1px solid #bfdbfe",
              borderRadius: 10,
              background: "#eff6ff",
              fontWeight: 700,
              color: "#1d4ed8",
            }}
          >
            Fill S1 if required, not mandetory
          </div>
        )}

        {visibleRows.length === 0 ? null : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Myotome</th>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Right</th>
                <th style={{ textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #e5e7eb" }}>Left</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => {
                const rightName = `myotome_${r.key}_right`;
                const leftName = `myotome_${r.key}_left`;
                return (
                  <tr key={r.key}>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9", fontWeight: 700 }}>
                      {r.label}
                    </td>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9" }}>
                      <select
                        value={values[rightName] || ""}
                        onChange={(e) => onChange(rightName, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          background: "#fff",
                        }}
                      >
                        <option value="">Select</option>
                        {strengthOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: "10px 8px", borderBottom: "1px solid #f1f5f9" }}>
                      <select
                        value={values[leftName] || ""}
                        onChange={(e) => onChange(leftName, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          background: "#fff",
                        }}
                      >
                        <option value="">Select</option>
                        {strengthOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  }

  function MASNotesForm({ values, onChange }) {
    return (
      <CommonFormBuilder
        schema={{
          title: "",
          sections: [{ fields: [{ name: "mas_scale_notes", label: "Modified Ashworth Scale (MAS)", type: "textarea" }] }],
        }}
        values={values}
        onChange={onChange}
        layout="nested"
      />
    );
  }
  const PHYSICAL_ASSESSMENT_REGISTRY = {
    pain_assessment: PainAssessmentForm,
    mrc_scale: MRCScaleForm,
    myotome_testing: MyotomeTestingForm,
    // Use the full MAS scale form (radio-matrix) for neurology/tone assessment.
    mas_scale: PTMASForm,
    // Keep notes form available if needed elsewhere.
    mas_scale_notes: MASNotesForm,
    rom: PTROMForm,
    asia_sci: SpinalcordInjury,
  };

  const PHYSICAL_SCHEMA = {
    sections: [
      {
        fields: [
          { type: "subheading", label: "Symptoms History" },
          { type: "subheading", label: "Motor Symptoms" },

          {
            name: "motor_muscle_weakness",
            label: "Muscle weakness",
            type: "radio",
            options: ["Yes", "No"],
          },

          {
            name: "motor_muscle_weakness_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "motor_muscle_weakness", equals: "Yes" },
          },
          {
            name: "motor_muscle_weakness_site_specify",
            label: "Specify",
            type: "input",
            showIf: {
              field: "motor_muscle_weakness",
              equals: "Yes",
              and: {
                or: [
                  { field: "motor_muscle_weakness_sites", includes: "rul" },
                  { field: "motor_muscle_weakness_sites", includes: "lul" },
                  { field: "motor_muscle_weakness_sites", includes: "rll" },
                  { field: "motor_muscle_weakness_sites", includes: "lll" }
                ]
              }
            }
          },

          {
            name: "motor_pain",
            label: "Pain",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "motor_pain_assessment",
            label: "",
            type: "assessment-launcher",
            autoOpen: true,
            options: [{ label: "Pain Assessment", value: "pain_assessment" }],
            showIf: { field: "motor_pain", equals: "Yes" },
          },

          {
            name: "motor_abnormal_movements",
            label: "Abnormal movements",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "motor_abnormal_movement_type",
            label: "Movement",
            type: "radio",
            options: [
              { label: "Tremor", value: "tremor" },
              { label: "Spasm", value: "spasm" },
              { label: "Involuntary", value: "involuntary" },
            ],
            showIf: { field: "motor_abnormal_movements", equals: "Yes" },
          },
          {
            name: "motor_abnormal_movement_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "motor_abnormal_movements", equals: "Yes" },
          },
          {
            name: "motor_abnormal_movements_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "motor_abnormal_movements", equals: "Yes" },
          },

          {
            name: "motor_tight_stiff_muscles",
            label: "Tight / Stiff muscles",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "motor_tight_stiff_muscles_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "motor_tight_stiff_muscles", equals: "Yes" },
          },
          {
            name: "motor_tight_stiff_muscles_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "motor_tight_stiff_muscles", equals: "Yes" },
          },

          {
            name: "motor_poor_coordination",
            label: "Poor coordination",
            type: "radio",
            options: ["Yes", "No"],
          },

          {
            name: "motor_muscle_fatigue",
            label: "Muscle fatigue",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "motor_muscle_fatigue_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "motor_muscle_fatigue", equals: "Yes" },
          },

          {
            name: "motor_postural_balance_issue",
            label: "Postural / Balance issue",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "motor_postural_balance_issue_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "motor_postural_balance_issue", equals: "Yes" },
          },

          {
            name: "motor_other_free_text",
            label: "Other issues",
            type: "textarea",
          },

          { type: "subheading", label: "Sensory Symptoms" },

          {
            name: "sensory_numbness",
            label: "Numbness",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "sensory_numbness_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "sensory_numbness", equals: "Yes" },
          },
          {
            name: "sensory_numbness_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "sensory_numbness", equals: "Yes" },
          },

          {
            name: "sensory_pain",
            label: "Pain",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "sensory_pain_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "sensory_pain", equals: "Yes" },
          },
          {
            name: "sensory_pain_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "sensory_pain", equals: "Yes" },
          },

          {
            name: "sensory_reduced_sensation",
            label: "Reduced sensation",
            type: "radio",
            options: ["Yes", "No"],
          },
          {
            name: "sensory_reduced_sensation_sites",
            label: "Site",
            type: "checkbox-group",
            options: [
              { label: "Right Upper Limb", value: "rul" },
              { label: "Left Upper Limb", value: "lul" },
              { label: "Right Lower Limb", value: "rll" },
              { label: "Left Lower Limb", value: "lll" },
            ],
            showIf: { field: "sensory_reduced_sensation", equals: "Yes" },
          },
          {
            name: "sensory_reduced_sensation_specify",
            label: "Specify",
            type: "input",
            showIf: { field: "sensory_reduced_sensation", equals: "Yes" },
          },

          {
            name: "sensory_other_complaint",
            label: "Other sensory complaint",
            type: "textarea",
          },

          {
            name: "red_flag_screening",
            label: "Red Flag Screening",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },
          {
            name: "neurological_emergency",
            label: "Neurological Emergency",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Progressive weakness", value: "progressive_weakness" },
              { label: "Bowel/bladder loss (suspect Cauda Equina)", value: "bowel_bladder_loss" },
              { label: "Horner's syndrome", value: "horners_syndrome" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "infection_flags",
            label: "Infection",
            type: "checkbox-group",
            options: [
              { label: "Fever", value: "fever" },
              { label: "Chills", value: "chills" },
              { label: "Night sweats", value: "night_sweats" },
              { label: "Persistent infection", value: "persistent_infection" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "tumor_cancer_indicators",
            label: "Tumor/Cancer Indicators",
            type: "checkbox-group",
            options: [
              { label: "History of cancer", value: "history_cancer" },
              { label: "Unexplained weight loss", value: "weight_loss" },
              { label: "Night pain", value: "night_pain" },
              { label: "Pain not relieved by rest", value: "no_relief_rest" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "trauma_fracture_flags",
            label: "Trauma/Fracture",
            type: "checkbox-group",
            options: [
              { label: "Recent fall", value: "recent_fall" },
              { label: "Inability to bear weight", value: "cannot_bear_weight" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "severe_persistent_pain_flags",
            label: "Severe/Persistent Pain",
            type: "checkbox-group",
            options: [
              { label: "Sudden severe pain", value: "sudden_severe_pain" },
              { label: "Not improving with rest", value: "no_improvement_rest" },
              { label: "Worsening night pain", value: "worsening_night_pain" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "cardiac_flags",
            label: "Cardiac",
            type: "checkbox-group",
            options: [
              { label: "Chest pain", value: "chest_pain" },
              { label: "Tachycardia", value: "tachycardia" },
              { label: "Breathlessness on exertion", value: "breathlessness_exertion" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "red_flag_specific",
            label: "Specify",
            type: "textarea",
            showIf: { field: "red_flag_screening", equals: "yes" },
          },
          {
            name: "arthritis_flags",
            label: "Arthritis",
            type: "checkbox-group",
            options: [
              { label: "Morning stiffness", value: "morning_stiffness" },
              { label: "Peripheral joint swelling", value: "peripheral_joint_swelling" },
            ],
            showIf: { field: "red_flag_screening", equals: "yes" },
          },

          {
            name: "yellow_flag_screening_present",
            label: "Yellow Flag Screening",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },
          {
            name: "yellow_flag_screening",
            label: "YELLOW FLAG SCREENING",
            type: "checkbox-group",
            options: [
              { label: "Fear avoidance", value: "fear_avoidance" },
              { label: "Catastrophizing", value: "catastrophizing" },
              { label: "Low mood", value: "low_mood" },
              { label: "Social stress", value: "social_stress" },
              { label: "Chronic pain behavior", value: "chronic_pain_behavior" },
              { label: "Other", value: "other_yellow_flag" },
            ],
            showIf: { field: "yellow_flag_screening_present", equals: "yes" },
          },
          {
            name: "yellow_flag_screening_specify",
            label: "Specify",
            type: "textarea",
            showIf: { field: "yellow_flag_screening", includes: "other_yellow_flag" },
          },

          { type: "subheading", label: "Condition Logic" },
          {
            name: "category",
            label: "Category",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Neurological Disorders", value: "stroke" },
              { label: "Spinal Cord Injury (SCI)", value: "sci" },
              { label: "Amputation", value: "amputation" },
            ],
          },
          {
            name: "region",
            label: "Region",
            type: "checkbox-group",
            options: [
              { label: "Upper Limb", value: "upper_limb" },
              { label: "Lower Limb", value: "lower_limb" },
            ],
          },
          {
            name: "amp_upper_limb_location",
            label: "Location",
            type: "radio",
            options: [
              { label: "Above Elbow", value: "above_elbow" },
              { label: "Below Elbow", value: "below_elbow" },
              { label: "Shoulder Disortation", value: "shoulder_disortation" },
              { label: "Rays Amputation", value: "rays_amputation" },
              { label: "Carpal / Metacarpal", value: "carpal_metacarpal" },
            ],
            showIf: {
              field: "category",
              includes: "amputation",
              and: { field: "region", includes: "upper_limb" },
            },
          },
          {
            name: "amp_lower_limb_location",
            label: "Location",
            type: "radio",
            options: [
              { label: "Above Knee", value: "above_knee" },
              { label: "Below Knee", value: "below_knee" },
              { label: "Hip Disortation", value: "hip_disortation" },
              { label: "Rays Amputation(Toes/Fingers)", value: "rays_amputation" },
              { label: "Tarsal / Metatarsal", value: "tarsal_metatarsal" },
            ],
            showIf: {
              field: "category",
              includes: "amputation",
              and: { field: "region", includes: "lower_limb" },
            },
          },
          { type: "subheading", label: "Physical Examination" },
          { type: "subheading", label: "General Inspection - Motor" },

          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_bulk_side",
                label: "Muscle Bulk",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_bulk_right",
                label: "Right",
                type: "radio",
                showIf: { field: "pe_muscle_bulk_side", includes: "right" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Atrophied", value: "atrophied" },
                  { label: "Hypertrophied", value: "hypertrophied" },
                ],
              },
              {
                name: "pe_muscle_bulk_left",
                label: "Left",
                type: "radio",
                showIf: { field: "pe_muscle_bulk_side", includes: "left" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Atrophied", value: "atrophied" },
                  { label: "Hypertrophied", value: "hypertrophied" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_bulk_comment_right",
                label: "Muscle Bulk Comment – Right",
                type: "input",
                showIf: { field: "pe_muscle_bulk_right", oneOf: ["atrophied", "hypertrophied"], and: { field: "pe_muscle_bulk_side", includes: "right" } },
              },
              {
                name: "pe_muscle_bulk_comment_left",
                label: "Muscle Bulk Comment – Left",
                type: "input",
                showIf: { field: "pe_muscle_bulk_left", oneOf: ["atrophied", "hypertrophied"], and: { field: "pe_muscle_bulk_side", includes: "left" } },
              },
            ],
          },

          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_posture_side",
                label: "Posture",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_posture_right",
                label: "Right",
                type: "radio",
                showIf: { field: "pe_posture_side", includes: "right" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Abnormal", value: "abnormal" },
                ],
              },
              {
                name: "pe_posture_left",
                label: "Left",
                type: "radio",
                showIf: { field: "pe_posture_side", includes: "left" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Abnormal", value: "abnormal" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_posture_comment_right",
                label: "Posture Comment – Right",
                type: "input",
                showIf: { field: "pe_posture_right", equals: "abnormal", and: { field: "pe_posture_side", includes: "right" } },
              },
              {
                name: "pe_posture_comment_left",
                label: "Posture Comment – Left",
                type: "input",
                showIf: { field: "pe_posture_left", equals: "abnormal", and: { field: "pe_posture_side", includes: "left" } },
              },
            ],
          },

          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_deformity_side",
                label: "Deformity",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_deformity_right",
                label: "Right",
                type: "radio",
                showIf: { field: "pe_deformity_side", includes: "right" },
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ],
              },
              {
                name: "pe_deformity_left",
                label: "Left",
                type: "radio",
                showIf: { field: "pe_deformity_side", includes: "left" },
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_deformity_comment_right",
                label: "Deformity Comment – Right",
                type: "input",
                showIf: { field: "pe_deformity_right", equals: "yes", and: { field: "pe_deformity_side", includes: "right" } },
              },
              {
                name: "pe_deformity_comment_left",
                label: "Deformity Comment – Left",
                type: "input",
                showIf: { field: "pe_deformity_left", equals: "yes", and: { field: "pe_deformity_side", includes: "left" } },
              },
            ],
          },

          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_scars_side",
                label: "Scars",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_scars_right",
                label: "Right",
                type: "radio",
                showIf: { field: "pe_scars_side", includes: "right" },
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ],
              },
              {
                name: "pe_scars_left",
                label: "Left",
                type: "radio",
                showIf: { field: "pe_scars_side", includes: "left" },
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_scars_comment_right",
                label: "Scars Comment – Right",
                type: "input",
                showIf: { field: "pe_scars_right", equals: "yes", and: { field: "pe_scars_side", includes: "right" } },
              },
              {
                name: "pe_scars_comment_left",
                label: "Scars Comment – Left",
                type: "input",
                showIf: { field: "pe_scars_left", equals: "yes", and: { field: "pe_scars_side", includes: "left" } },
              },
            ],
          },

          { type: "subheading", label: "Tone" },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_tone_side",
                label: "Muscle Tone",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_tone_right",
                label: "Right",
                type: "radio",
                showIf: { field: "pe_muscle_tone_side", includes: "right" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Hypotonia", value: "hypotonia" },
                  { label: "Hypertonia", value: "hypertonia" },
                ],
              },
              {
                name: "pe_muscle_tone_left",
                label: "Left",
                type: "radio",
                showIf: { field: "pe_muscle_tone_side", includes: "left" },
                options: [
                  { label: "Normal", value: "normal" },
                  { label: "Hypotonia", value: "hypotonia" },
                  { label: "Hypertonia", value: "hypertonia" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_muscle_tone_comment_right",
                label: "Muscle Tone Comment – Right",
                type: "input",
                showIf: {
                  field: "pe_muscle_tone_right",
                  oneOf: ["hypotonia", "hypertonia"],
                  and: { field: "pe_muscle_tone_side", includes: "right" },
                },
              },
              {
                name: "pe_muscle_tone_comment_left",
                label: "Muscle Tone Comment – Left",
                type: "input",
                showIf: {
                  field: "pe_muscle_tone_left",
                  oneOf: ["hypotonia", "hypertonia"],
                  and: { field: "pe_muscle_tone_side", includes: "left" },
                },
              },
            ],
          },
          {
            name: "pe_mas_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Modified Ashworth Scale (MAS)", value: "mas_scale" }],
          },

          {
            name: "pe_inspection_specify",
            label: "Specify",
            type: "input",
          },

          { type: "subheading", label: "ROM" },
          {
            name: "pe_rom_launcher",
            label: "",
            type: "assessment-launcher",
            autoOpen: true,
            options: [{ label: "Mobility of Joint Functions: ROM", value: "rom" }],
          },

          { type: "subheading", label: "Strength" },
          {
            name: "pe_strength_assessment",
            label: "Strength Assessment",
            type: "radio",
            showIf: { field: "is_sci_selected", equals: true },
            options: [{ label: "MRC Scale", value: "mrc_scale" }],
          },
          {
            name: "pe_strength_assessment",
            label: "Strength Assessment",
            type: "radio",
            showIf: { field: "is_sci_selected", equals: false },
            options: [
              { label: "MRC Scale", value: "mrc_scale" },
              { label: "Myotome Testing", value: "myotome_testing" },
            ],
          },
          {
            name: "pe_mrc_launcher",
            label: "",
            type: "assessment-launcher",
            autoOpen: true,
            options: [{ label: "MRC Scale", value: "mrc_scale" }],
            showIf: { field: "pe_strength_assessment", equals: "mrc_scale" },
          },
          {
            name: "pe_myotome_launcher",
            label: "",
            type: "assessment-launcher",
            autoOpen: true,
            options: [{ label: "Myotome Testing", value: "myotome_testing" }],
            showIf: { field: "pe_strength_assessment", equals: "myotome_testing" },
          },

          { type: "subheading", label: "Involuntary Movements" },
          {
            name: "pe_involuntary_movements",
            label: "",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "None", value: "none" },
              { label: "Tremor", value: "tremor" },
              { label: "Chorea", value: "chorea" },
              { label: "Dystonia", value: "dystonia" },
              { label: "Fasciculation", value: "fasciculation" },
            ],
          },
          {
            name: "pe_involuntary_movements_freetext",
            label: "Specify",
            type: "input",
          },

          { type: "subheading", label: "Reflexes" },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_reflex_biceps_side",
                label: "Biceps",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_reflex_biceps_right", label: "Right", type: "radio", showIf: { field: "pe_reflex_biceps_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_reflex_biceps_left", label: "Left", type: "radio", showIf: { field: "pe_reflex_biceps_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_reflex_triceps_side",
                label: "Triceps",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_reflex_triceps_right", label: "Right", type: "radio", showIf: { field: "pe_reflex_triceps_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_reflex_triceps_left", label: "Left", type: "radio", showIf: { field: "pe_reflex_triceps_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_reflex_knee_side",
                label: "Knee",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_reflex_knee_right", label: "Right", type: "radio", showIf: { field: "pe_reflex_knee_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_reflex_knee_left", label: "Left", type: "radio", showIf: { field: "pe_reflex_knee_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_reflex_ankle_side",
                label: "Ankle",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_reflex_ankle_right", label: "Right", type: "radio", showIf: { field: "pe_reflex_ankle_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_reflex_ankle_left", label: "Left", type: "radio", showIf: { field: "pe_reflex_ankle_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_reflex_babinski_side",
                label: "Babinski",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_reflex_babinski_right", label: "Right", type: "radio", showIf: { field: "pe_reflex_babinski_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_reflex_babinski_left", label: "Left", type: "radio", showIf: { field: "pe_reflex_babinski_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },

          { type: "subheading", label: "Sensory Examination (General)" },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_light_touch_area",
                label: "Light Touch",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Upper limb", value: "upper" },
                  { label: "Lower limb", value: "lower" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_light_touch_upper",
                label: "Upper limb",
                type: "radio",
                showIf: { field: "pe_light_touch_area", includes: "upper" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
              {
                name: "pe_light_touch_lower",
                label: "Lower limb",
                type: "radio",
                showIf: { field: "pe_light_touch_area", includes: "lower" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_light_touch_upper_specify",
                label: "Specify (Upper)",
                type: "input",
                showIf: { field: "pe_light_touch_upper", equals: "impaired", and: { field: "pe_light_touch_area", includes: "upper" } },
              },
              {
                name: "pe_light_touch_lower_specify",
                label: "Specify (Lower)",
                type: "input",
                showIf: { field: "pe_light_touch_lower", equals: "impaired", and: { field: "pe_light_touch_area", includes: "lower" } },
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_pinprick_area",
                label: "Pin Prick",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Upper limb", value: "upper" },
                  { label: "Lower limb", value: "lower" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_pinprick_upper",
                label: "Upper limb",
                type: "radio",
                showIf: { field: "pe_pinprick_area", includes: "upper" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
              {
                name: "pe_pinprick_lower",
                label: "Lower limb",
                type: "radio",
                showIf: { field: "pe_pinprick_area", includes: "lower" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_pinprick_upper_specify",
                label: "Specify (Upper)",
                type: "input",
                showIf: { field: "pe_pinprick_upper", equals: "impaired", and: { field: "pe_pinprick_area", includes: "upper" } },
              },
              {
                name: "pe_pinprick_lower_specify",
                label: "Specify (Lower)",
                type: "input",
                showIf: { field: "pe_pinprick_lower", equals: "impaired", and: { field: "pe_pinprick_area", includes: "lower" } },
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_proprioception_area",
                label: "Proprioception",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Upper limb", value: "upper" },
                  { label: "Lower limb", value: "lower" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_proprioception_upper",
                label: "Upper limb",
                type: "radio",
                showIf: { field: "pe_proprioception_area", includes: "upper" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
              {
                name: "pe_proprioception_lower",
                label: "Lower limb",
                type: "radio",
                showIf: { field: "pe_proprioception_area", includes: "lower" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_proprioception_upper_specify",
                label: "Specify (Upper)",
                type: "input",
                showIf: { field: "pe_proprioception_upper", equals: "impaired", and: { field: "pe_proprioception_area", includes: "upper" } },
              },
              {
                name: "pe_proprioception_lower_specify",
                label: "Specify (Lower)",
                type: "input",
                showIf: { field: "pe_proprioception_lower", equals: "impaired", and: { field: "pe_proprioception_area", includes: "lower" } },
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_vibration_area",
                label: "Vibration",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Upper limb", value: "upper" },
                  { label: "Lower limb", value: "lower" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_vibration_upper",
                label: "Upper limb",
                type: "radio",
                showIf: { field: "pe_vibration_area", includes: "upper" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
              {
                name: "pe_vibration_lower",
                label: "Lower limb",
                type: "radio",
                showIf: { field: "pe_vibration_area", includes: "lower" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_vibration_upper_comment",
                label: "Vibration – Comment (Upper)",
                type: "input",
                showIf: { field: "pe_vibration_upper", equals: "impaired", and: { field: "pe_vibration_area", includes: "upper" } },
              },
              {
                name: "pe_vibration_lower_comment",
                label: "Vibration – Comment (Lower)",
                type: "input",
                showIf: { field: "pe_vibration_lower", equals: "impaired", and: { field: "pe_vibration_area", includes: "lower" } },
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_cortical_sensory_area",
                label: "Cortical Sensory",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Upper limb", value: "upper" },
                  { label: "Lower limb", value: "lower" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_cortical_sensory_upper",
                label: "Upper limb",
                type: "radio",
                showIf: { field: "pe_cortical_sensory_area", includes: "upper" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
              {
                name: "pe_cortical_sensory_lower",
                label: "Lower limb",
                type: "radio",
                showIf: { field: "pe_cortical_sensory_area", includes: "lower" },
                options: [
                  { label: "Intact", value: "intact" },
                  { label: "Impaired", value: "impaired" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_cortical_sensory_upper_comment",
                label: "Cortical Sensory – Comment (Upper)",
                type: "input",
                showIf: { field: "pe_cortical_sensory_upper", equals: "impaired", and: { field: "pe_cortical_sensory_area", includes: "upper" } },
              },
              {
                name: "pe_cortical_sensory_lower_comment",
                label: "Cortical Sensory – Comment (Lower)",
                type: "input",
                showIf: { field: "pe_cortical_sensory_lower", equals: "impaired", and: { field: "pe_cortical_sensory_area", includes: "lower" } },
              },
            ],
          },
          {
            name: "pe_cortical_sensory_specify",
            label: "Specify",
            type: "textarea",
            showIf: {
              or: [
                { field: "pe_cortical_sensory_upper", equals: "impaired" },
                { field: "pe_cortical_sensory_lower", equals: "impaired" },
              ],
            },
          },
          {
            type: "row",
            fields: [
              { name: "pe_temperature_upper", label: "Temperature – Upper Limb", type: "input" },
              { name: "pe_temperature_lower", label: "Temperature – Lower Limb", type: "input" },
            ],
          },

          { type: "subheading", label: "Cranial Nerve Examination: CRANIAL NERVES (CN I–XII)" },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_1_side", label: "CN I – Olfactory", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_1_right", label: "Right", type: "radio", showIf: { field: "pe_cn_1_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_1_left", label: "Left", type: "radio", showIf: { field: "pe_cn_1_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_1_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_1_right", equals: "impaired", and: { field: "pe_cn_1_side", includes: "right" } } }, { name: "pe_cn_1_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_1_left", equals: "impaired", and: { field: "pe_cn_1_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_2_side", label: "CN II – Optic", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_2_right", label: "Right", type: "radio", showIf: { field: "pe_cn_2_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_2_left", label: "Left", type: "radio", showIf: { field: "pe_cn_2_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_2_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_2_right", equals: "impaired", and: { field: "pe_cn_2_side", includes: "right" } } }, { name: "pe_cn_2_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_2_left", equals: "impaired", and: { field: "pe_cn_2_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_3_side", label: "CN III – Oculomotor", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_3_right", label: "Right", type: "radio", showIf: { field: "pe_cn_3_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_3_left", label: "Left", type: "radio", showIf: { field: "pe_cn_3_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_3_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_3_right", equals: "impaired", and: { field: "pe_cn_3_side", includes: "right" } } }, { name: "pe_cn_3_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_3_left", equals: "impaired", and: { field: "pe_cn_3_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_4_side", label: "CN IV – Trochlear", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_4_right", label: "Right", type: "radio", showIf: { field: "pe_cn_4_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_4_left", label: "Left", type: "radio", showIf: { field: "pe_cn_4_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_4_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_4_right", equals: "impaired", and: { field: "pe_cn_4_side", includes: "right" } } }, { name: "pe_cn_4_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_4_left", equals: "impaired", and: { field: "pe_cn_4_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_5_side", label: "CN V – Trigeminal", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_5_right", label: "Right", type: "radio", showIf: { field: "pe_cn_5_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_5_left", label: "Left", type: "radio", showIf: { field: "pe_cn_5_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_5_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_5_right", equals: "impaired", and: { field: "pe_cn_5_side", includes: "right" } } }, { name: "pe_cn_5_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_5_left", equals: "impaired", and: { field: "pe_cn_5_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_6_side", label: "CN VI – Abducens", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_6_right", label: "Right", type: "radio", showIf: { field: "pe_cn_6_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_6_left", label: "Left", type: "radio", showIf: { field: "pe_cn_6_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_6_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_6_right", equals: "impaired", and: { field: "pe_cn_6_side", includes: "right" } } }, { name: "pe_cn_6_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_6_left", equals: "impaired", and: { field: "pe_cn_6_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_7_side", label: "CN VII – Facial", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_7_right", label: "Right", type: "radio", showIf: { field: "pe_cn_7_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_7_left", label: "Left", type: "radio", showIf: { field: "pe_cn_7_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_7_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_7_right", equals: "impaired", and: { field: "pe_cn_7_side", includes: "right" } } }, { name: "pe_cn_7_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_7_left", equals: "impaired", and: { field: "pe_cn_7_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_8_side", label: "CN VIII – Vestibulocochlear", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_8_right", label: "Right", type: "radio", showIf: { field: "pe_cn_8_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_8_left", label: "Left", type: "radio", showIf: { field: "pe_cn_8_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_8_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_8_right", equals: "impaired", and: { field: "pe_cn_8_side", includes: "right" } } }, { name: "pe_cn_8_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_8_left", equals: "impaired", and: { field: "pe_cn_8_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_9_10_side", label: "CN IX, X – Glossopharyngeal / Vagus", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_9_10_right", label: "Right", type: "radio", showIf: { field: "pe_cn_9_10_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_9_10_left", label: "Left", type: "radio", showIf: { field: "pe_cn_9_10_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_9_10_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_9_10_right", equals: "impaired", and: { field: "pe_cn_9_10_side", includes: "right" } } }, { name: "pe_cn_9_10_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_9_10_left", equals: "impaired", and: { field: "pe_cn_9_10_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_11_side", label: "CN XI – Accessory", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_11_right", label: "Right", type: "radio", showIf: { field: "pe_cn_11_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_11_left", label: "Left", type: "radio", showIf: { field: "pe_cn_11_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_11_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_11_right", equals: "impaired", and: { field: "pe_cn_11_side", includes: "right" } } }, { name: "pe_cn_11_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_11_left", equals: "impaired", and: { field: "pe_cn_11_side", includes: "left" } } }] },

          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_12_side", label: "CN XII – Hypoglossal", type: "checkbox-group", position: "side", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_cn_12_right", label: "Right", type: "radio", showIf: { field: "pe_cn_12_side", includes: "right" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
              { name: "pe_cn_12_left", label: "Left", type: "radio", showIf: { field: "pe_cn_12_side", includes: "left" }, options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }] },
            ],
          },
          { type: "row", compact: true, fields: [{ name: "pe_cn_12_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_cn_12_right", equals: "impaired", and: { field: "pe_cn_12_side", includes: "right" } } }, { name: "pe_cn_12_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_cn_12_left", equals: "impaired", and: { field: "pe_cn_12_side", includes: "left" } } }] },
          { name: "pe_cranial_nerve_specify", label: "Specify", type: "textarea" },

          { type: "subheading", label: "Coordination and cerebellar function" },
          { name: "pe_titubation", label: "Titubation", type: "radio", options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
          { name: "pe_titubation_specify", label: "Specify", type: "input", showIf: { field: "pe_titubation", equals: "present" } },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_nystagmus_side",
                label: "Nystagmus",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_nystagmus_right", label: "Right", type: "radio", showIf: { field: "pe_nystagmus_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_nystagmus_left", label: "Left", type: "radio", showIf: { field: "pe_nystagmus_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_nystagmus_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_nystagmus_right", equals: "present", and: { field: "pe_nystagmus_side", includes: "right" } } },
              { name: "pe_nystagmus_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_nystagmus_left", equals: "present", and: { field: "pe_nystagmus_side", includes: "left" } } },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_finger_nose_side",
                label: "Finger-nose Test",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_finger_nose_right", label: "Right", type: "radio", showIf: { field: "pe_finger_nose_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_finger_nose_left", label: "Left", type: "radio", showIf: { field: "pe_finger_nose_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_finger_nose_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_finger_nose_right", equals: "present", and: { field: "pe_finger_nose_side", includes: "right" } } },
              { name: "pe_finger_nose_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_finger_nose_left", equals: "present", and: { field: "pe_finger_nose_side", includes: "left" } } },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_rebound_side",
                label: "Rebound Phenomenon",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_rebound_right", label: "Right", type: "radio", showIf: { field: "pe_rebound_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_rebound_left", label: "Left", type: "radio", showIf: { field: "pe_rebound_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_rebound_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_rebound_right", equals: "present", and: { field: "pe_rebound_side", includes: "right" } } },
              { name: "pe_rebound_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_rebound_left", equals: "present", and: { field: "pe_rebound_side", includes: "left" } } },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_pronator_drift_side",
                label: "Pronator drift",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_pronator_drift_right", label: "Right", type: "radio", showIf: { field: "pe_pronator_drift_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_pronator_drift_left", label: "Left", type: "radio", showIf: { field: "pe_pronator_drift_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_pronator_drift_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_pronator_drift_right", equals: "present", and: { field: "pe_pronator_drift_side", includes: "right" } } },
              { name: "pe_pronator_drift_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_pronator_drift_left", equals: "present", and: { field: "pe_pronator_drift_side", includes: "left" } } },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_dysdiadochokinesia_side",
                label: "Dysdiadochokinesia",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_dysdiadochokinesia_right", label: "Right", type: "radio", showIf: { field: "pe_dysdiadochokinesia_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_dysdiadochokinesia_left", label: "Left", type: "radio", showIf: { field: "pe_dysdiadochokinesia_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_dysdiadochokinesia_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_dysdiadochokinesia_right", equals: "present", and: { field: "pe_dysdiadochokinesia_side", includes: "right" } } },
              { name: "pe_dysdiadochokinesia_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_dysdiadochokinesia_left", equals: "present", and: { field: "pe_dysdiadochokinesia_side", includes: "left" } } },
            ],
          },
          { name: "pe_romberg", label: "Romberg's Test", type: "radio", options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
          { name: "pe_romberg_specify", label: "Specify", type: "input", showIf: { field: "pe_romberg", equals: "present" } },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_heel_shin_side",
                label: "Heel shin Test",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_heel_shin_right", label: "Right", type: "radio", showIf: { field: "pe_heel_shin_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_heel_shin_left", label: "Left", type: "radio", showIf: { field: "pe_heel_shin_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_heel_shin_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_heel_shin_right", equals: "present", and: { field: "pe_heel_shin_side", includes: "right" } } },
              { name: "pe_heel_shin_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_heel_shin_left", equals: "present", and: { field: "pe_heel_shin_side", includes: "left" } } },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              {
                name: "pe_pendular_reflexes_side",
                label: "Pendular Reflexes",
                type: "checkbox-group",
                position: "side",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                ],
              },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_pendular_reflexes_right", label: "Right", type: "radio", showIf: { field: "pe_pendular_reflexes_side", includes: "right" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
              { name: "pe_pendular_reflexes_left", label: "Left", type: "radio", showIf: { field: "pe_pendular_reflexes_side", includes: "left" }, options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
            ],
          },
          {
            type: "row",
            compact: true,
            fields: [
              { name: "pe_pendular_reflexes_right_specify", label: "Specify (Right)", type: "input", showIf: { field: "pe_pendular_reflexes_right", equals: "present", and: { field: "pe_pendular_reflexes_side", includes: "right" } } },
              { name: "pe_pendular_reflexes_left_specify", label: "Specify (Left)", type: "input", showIf: { field: "pe_pendular_reflexes_left", equals: "present", and: { field: "pe_pendular_reflexes_side", includes: "left" } } },
            ],
          },
          { name: "pe_tandem_gait", label: "Tandem Gait", type: "radio", options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
          { name: "pe_tandem_gait_specify", label: "Specify", type: "input", showIf: { field: "pe_tandem_gait", equals: "present" } },

          { type: "subheading", label: "Special Tests (If Indicated)" },
          {
            name: "pe_special_region",
            label: "Region",
            type: "checkbox-group",
            options: [
              { label: "Cervical (Neck)", value: "cervical" },
              { label: "Shoulder", value: "shoulder" },
              { label: "Lumbar (L1-L5) (Lower Back)", value: "lumbar" },
              { label: "Knee", value: "knee" },
              { label: "Ankle", value: "ankle" },
              { label: "Thoracic Spine (T1-T5) (upper and mid-back)", value: "thoracic_spine" },
              { label: "Hip", value: "hip" },
              { label: "Elbow", value: "elbow" },
              { label: "Wrist", value: "wrist" },
            ],
          },

          { type: "subheading", label: "Cervical (Neck)", showIf: { field: "pe_special_region", includes: "cervical" } },
          {
            name: "pe_special_cervical_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Spurling maneuver", value: "spurling" },
              { label: "Shoulder abduction sign", value: "shoulder_abduction_sign" },
              { label: "Neck distraction test", value: "neck_distraction" },
              { label: "Vasalva test", value: "vasalva" },
              { label: "Lhermitte's sign", value: "lhermittes" },
            ],
            showIf: { field: "pe_special_region", includes: "cervical" },
          },
          { name: "pe_special_cervical_spurling", label: "Spurling maneuver", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_cervical_tests", includes: "spurling" } },
          { name: "pe_special_cervical_shoulder_abduction", label: "Shoulder abduction sign", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_cervical_tests", includes: "shoulder_abduction_sign" } },
          { name: "pe_special_cervical_neck_distraction", label: "Neck distraction test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_cervical_tests", includes: "neck_distraction" } },
          { name: "pe_special_cervical_vasalva", label: "Vasalva test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_cervical_tests", includes: "vasalva" } },
          { name: "pe_special_cervical_lhermittes", label: "Lhermitte's sign", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_cervical_tests", includes: "lhermittes" } },

          { type: "subheading", label: "Shoulder", showIf: { field: "pe_special_region", includes: "shoulder" } },
          {
            name: "pe_special_shoulder_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Scalf test", value: "scalf" },
              { label: "Yergason test", value: "yergason" },
              { label: "Speed test", value: "speed" },
              { label: "Empty can test", value: "empty_can" },
              { label: "Bellt press test", value: "bellt_press" },
              { label: "External rotation strength test", value: "external_rotation_strength" },
              { label: "Drop arm test", value: "drop_arm" },
              { label: "Neer's test", value: "neers" },
              { label: "Hawkins Kennedy test", value: "hawkins_kennedy" },
            ],
            showIf: { field: "pe_special_region", includes: "shoulder" },
          },
          { name: "pe_special_shoulder_scalf", label: "Scalf test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "scalf" } },
          { name: "pe_special_shoulder_yergason", label: "Yergason test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "yergason" } },
          { name: "pe_special_shoulder_speed", label: "Speed test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "speed" } },
          { name: "pe_special_shoulder_empty_can", label: "Empty can test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "empty_can" } },
          { name: "pe_special_shoulder_bellt_press", label: "Bellt press test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "bellt_press" } },
          { name: "pe_special_shoulder_external_rotation", label: "External rotation strength test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "external_rotation_strength" } },
          { name: "pe_special_shoulder_drop_arm", label: "Drop arm test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "drop_arm" } },
          { name: "pe_special_shoulder_neers", label: "Neer's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "neers" } },
          { name: "pe_special_shoulder_hawkins_kennedy", label: "Hawkins Kennedy test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_shoulder_tests", includes: "hawkins_kennedy" } },

          { type: "subheading", label: "Elbow", showIf: { field: "pe_special_region", includes: "elbow" } },
          {
            name: "pe_special_elbow_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Cozen's test", value: "cozens" },
              { label: "Mudsleys test", value: "mudsleys" },
            ],
            showIf: { field: "pe_special_region", includes: "elbow" },
          },
          { name: "pe_special_elbow_cozens", label: "Cozen's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_elbow_tests", includes: "cozens" } },
          { name: "pe_special_elbow_mudsleys", label: "Mudsleys test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_elbow_tests", includes: "mudsleys" } },

          { type: "subheading", label: "Lumbar (L1-L5) (Lower Back)", showIf: { field: "pe_special_region", includes: "lumbar" } },
          {
            name: "pe_special_lumbar_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Straight leg raising test", value: "slr" },
              { label: "Kemp's test", value: "kemps" },
              { label: "FABER", value: "faber" },
              { label: "Thigh thrust", value: "thigh_thrust" },
              { label: "Compression test", value: "compression" },
              { label: "Sacral trust", value: "sacral_trust" },
              { label: "FADER", value: "fader" },
              { label: "FAIR", value: "fair" },
            ],
            showIf: { field: "pe_special_region", includes: "lumbar" },
          },
          { name: "pe_special_lumbar_slr", label: "Straight leg raising test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "slr" } },
          { name: "pe_special_lumbar_kemps", label: "Kemp's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "kemps" } },
          { name: "pe_special_lumbar_faber", label: "FABER", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "faber" } },
          { name: "pe_special_lumbar_thigh_thrust", label: "Thigh thrust", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "thigh_thrust" } },
          { name: "pe_special_lumbar_compression", label: "Compression test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "compression" } },
          { name: "pe_special_lumbar_sacral_trust", label: "Sacral trust", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "sacral_trust" } },
          { name: "pe_special_lumbar_fader", label: "FADER", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "fader" } },
          { name: "pe_special_lumbar_fair", label: "FAIR", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_lumbar_tests", includes: "fair" } },

          { type: "subheading", label: "Knee", showIf: { field: "pe_special_region", includes: "knee" } },
          {
            name: "pe_special_knee_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Varus stress test", value: "varus_stress" },
              { label: "Valgus stress test", value: "valgus_stress" },
              { label: "Anterior drawer test", value: "anterior_drawer" },
              { label: "Posterior drawer test", value: "posterior_drawer" },
              { label: "Mc Murray test", value: "mc_murray" },
            ],
            showIf: { field: "pe_special_region", includes: "knee" },
          },
          { name: "pe_special_knee_varus", label: "Varus stress test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_knee_tests", includes: "varus_stress" } },
          { name: "pe_special_knee_valgus", label: "Valgus stress test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_knee_tests", includes: "valgus_stress" } },
          { name: "pe_special_knee_anterior_drawer", label: "Anterior drawer test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_knee_tests", includes: "anterior_drawer" } },
          { name: "pe_special_knee_posterior_drawer", label: "Posterior drawer test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_knee_tests", includes: "posterior_drawer" } },
          { name: "pe_special_knee_mc_murray", label: "Mc Murray test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_knee_tests", includes: "mc_murray" } },

          { type: "subheading", label: "Ankle", showIf: { field: "pe_special_region", includes: "ankle" } },
          {
            name: "pe_special_ankle_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Anterior drawer test", value: "anterior_drawer" },
              { label: "Talar tilt test", value: "talar_tilt" },
              { label: "Inversion stress test", value: "inversion_stress" },
            ],
            showIf: { field: "pe_special_region", includes: "ankle" },
          },
          { name: "pe_special_ankle_anterior_drawer", label: "Anterior drawer test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_ankle_tests", includes: "anterior_drawer" } },
          { name: "pe_special_ankle_talar_tilt", label: "Talar tilt test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_ankle_tests", includes: "talar_tilt" } },
          { name: "pe_special_ankle_inversion_stress", label: "Inversion stress test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_ankle_tests", includes: "inversion_stress" } },

          { type: "subheading", label: "Thoracic Spine (T1-T5) (upper and mid-back)", showIf: { field: "pe_special_region", includes: "thoracic_spine" } },
          {
            name: "pe_special_thoracic_tests",
            label: "",
            type: "checkbox-group",
            options: [{ label: "Kemp's test", value: "kemps" }],
            showIf: { field: "pe_special_region", includes: "thoracic_spine" },
          },
          { name: "pe_special_thoracic_kemps", label: "Kemp's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_thoracic_tests", includes: "kemps" } },

          { type: "subheading", label: "Hip", showIf: { field: "pe_special_region", includes: "hip" } },
          {
            name: "pe_special_hip_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Ober's test", value: "obers" },
              { label: "Trendelenburg test", value: "trendelenburg" },
            ],
            showIf: { field: "pe_special_region", includes: "hip" },
          },
          { name: "pe_special_hip_obers", label: "Ober's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_hip_tests", includes: "obers" } },
          { name: "pe_special_hip_trendelenburg", label: "Trendelenburg test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_hip_tests", includes: "trendelenburg" } },

          { type: "subheading", label: "Wrist", showIf: { field: "pe_special_region", includes: "wrist" } },
          {
            name: "pe_special_wrist_tests",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Tinnel sign", value: "tinnel" },
              { label: "Phallen's test", value: "phallens" },
            ],
            showIf: { field: "pe_special_region", includes: "wrist" },
          },
          { name: "pe_special_wrist_tinnel", label: "Tinnel sign", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_wrist_tests", includes: "tinnel" } },
          { name: "pe_special_wrist_phallens", label: "Phallen's test", type: "radio", options: [{ label: "Positive", value: "positive" }, { label: "Negative", value: "negative" }], showIf: { field: "pe_special_wrist_tests", includes: "phallens" } },
          /* ========== GOALS & PLAN ========== */
          {
            type: "subheading",
            label: "Goals"
          },
          {
            name: "physical_goals",
            type: "textarea",
            placeholder: "Enter goals"
          },

          {
            type: "subheading",
            label: "Plan"
          },
          {
            name: "physical_plan",
            type: "textarea",
            placeholder: "Enter plan"
          },
          /* ========== SPINAL CORD INJURY (SCI) ========== */
          {
            name: "sci_asia_launcher",
            label: "",
            type: "assessment-launcher",
            autoOpen: true,
            options: [{ label: "ASIA / ISNCSCI Assessment", value: "asia_sci" }],
            showIf: { field: "category", includes: "sci" },
          },

          /* ========== AMPUTATION ========== */
          { type: "subheading", label: "AMPUTATION HISTORY", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_amputation", label: "Amputation", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_site", label: "Site of Amputation", type: "checkbox-group", options: [{ label: "Left", value: "left" }, { label: "Right", value: "right" }], showIf: { field: "category", includes: "amputation", and: { field: "amp_amputation", equals: "Yes" } } },
          { name: "amp_date_operation", label: "Date of Operation/Amputation", type: "date", showIf: { field: "category", includes: "amputation", and: { field: "amp_amputation", equals: "Yes" } } },
          { name: "amp_indication", label: "Indication for Amputation", type: "radio", labelAbove: true, options: [{ label: "Diabetic foot complication", value: "diabetic_foot" }, { label: "Traumatic", value: "traumatic" }, { label: "Peripheral vascular disease", value: "pvd" }, { label: "Tumour", value: "tumour" }, { label: "Congenital", value: "congenital" }], showIf: { field: "category", includes: "amputation", and: { field: "amp_amputation", equals: "Yes" } } },
          { name: "amp_wound_healing", label: "Post-operative Wound Healing", type: "radio", labelAbove: true, options: [{ label: "Satisfactory", value: "satisfactory" }, { label: "Delayed", value: "delayed" }, { label: "Infection present", value: "infection_present" }], showIf: { field: "category", includes: "amputation", and: { field: "amp_amputation", equals: "Yes" } } },

          { type: "subheading", label: "PROSTHESIS HISTORY", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_prosthesis_restored", label: "Prosthesis Restored", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_prosthesis_type", label: "Type of Prosthesis", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_prosthesis_restored", equals: "Yes" } } },
          { name: "amp_prosthesis_date_fitting", label: "Date of Fitting", type: "date", showIf: { field: "category", includes: "amputation", and: { field: "amp_prosthesis_restored", equals: "Yes" } } },
          { name: "amp_prosthesis_supplier", label: "Supplier / Prosthetic Center", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_prosthesis_restored", equals: "Yes" } } },
          { name: "amp_prosthesis_issues", label: "Any Prosthesis-related issues", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation", and: { field: "amp_prosthesis_restored", equals: "Yes" } } },

          { name: "amp_premorbid_mobility", label: "PRE-AMPUTATION FUNCTIONAL STATUS (Premorbid Mobility)", type: "radio", labelAbove: true, options: [{ label: "Independent without aid", value: "independent" }, { label: "With walking aid", value: "walking_aid" }, { label: "Household ambulator", value: "household_ambulator" }, { label: "Wheelchair dependent", value: "wheelchair_dependent" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "PHYSICAL EXAMINATION", showIf: { field: "category", includes: "amputation" } },
          { type: "subheading", label: "BODY FUNCTIONS", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_inspection", label: "Inspection", type: "textarea", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_observe_for", label: "Observe for", type: "radio", labelAbove: true, options: [{ label: "Residual limb condition", value: "residual_limb" }, { label: "Posture", value: "posture" }, { label: "Muscle wasting", value: "muscle_wasting" }, { label: "Skin changes", value: "skin_changes" }, { label: "Deformity", value: "deformity" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_palpation", label: "Palpation", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Warmth", value: "warmth" }, { label: "Erythematous", value: "erythematous" }, { label: "Tenderness", value: "tenderness" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_involuntary_movement", label: "Involuntary Movement Functions", type: "radio", options: [{ label: "Tremor", value: "tremor" }, { label: "Chorea", value: "chorea" }, { label: "Dystonia", value: "dystonia" }, { label: "Dyskinesia", value: "dyskinesia" }, { label: "Athetosis", value: "athetosis" }, { label: "Nil", value: "nil" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Sensory Functions & Pain", showIf: { field: "category", includes: "amputation" } },
          { type: "subheading", label: "Sensory Examination", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_light_touch", label: "Light Touch", type: "radio", options: [{ label: "Intact", value: "intact" }, { label: "Absent", value: "absent" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_pin_prick", label: "Pin Prick", type: "radio", options: [{ label: "Intact", value: "intact" }, { label: "Absent", value: "absent" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_phantom_limb_sensation", label: "Phantom Limb Sensation", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_phantom_limb_sensation_specify", label: "Severity & frequency", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_phantom_limb_sensation", equals: "Yes" } } },
          { name: "amp_phantom_limb_pain", label: "Phantom Limb Pain", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_phantom_limb_pain_specify", label: "Severity & frequency", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_phantom_limb_pain", equals: "Yes" } } },
          { name: "amp_neuropathic_pain", label: "Neuropathic Pain", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_neuropathic_pain_specify", label: "Severity & frequency", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_neuropathic_pain", equals: "Yes" } } },

          { type: "subheading", label: "Sensory Hypersensitivity", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_hypersensitivity", label: "Hypersensitivity", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_hyperesthesia", label: "Hyperesthesia", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Stump (Residual Limb) Examination", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_stump_site", label: "Site", type: "input", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_stump_shape", label: "Shape", type: "radio", options: [{ label: "Conical", value: "conical" }, { label: "Cylindrical", value: "cylindrical" }, { label: "Bulbous", value: "bulbous" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_stump_length", label: "Length", type: "radio", options: [{ label: "Adequate", value: "adequate" }, { label: "Long", value: "long" }, { label: "Short", value: "short" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_redundant_tissue", label: "Redundant Tissue", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { type: "subheading", label: "Skin Condition", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_skin_colour", label: "Color", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Cyanotic", value: "cyanotic" }, { label: "Erythematous", value: "erythematous" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_skin_moisture", label: "Moisture", type: "radio", options: [{ label: "Dry", value: "dry" }, { label: "Scaly", value: "scaly" }, { label: "Moist", value: "moist" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_skin_integrity", label: "Integrity", type: "radio", options: [{ label: "Ulcer", value: "ulcer" }, { label: "Blister", value: "blister" }, { label: "Scar", value: "scar" }, { label: "Infection", value: "infection" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_graft_flap_viability", label: "Graft / Flap Viability", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No graft / flap", value: "no_graft_flap" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_edema_swelling", label: "Edema / Swelling", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_trophic_changes", label: "Trophic Changes", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Scar Assessment", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_scar_location", label: "Location", type: "textarea", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_scar_tenderness", label: "Tenderness", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_scar_adherence", label: "Adherence", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Musculoskeletal Complications", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_contracture", label: "Contracture", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_contracture_joint", label: "Which Joint involved", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_contracture", equals: "Yes" } } },
          { name: "amp_joint_stiffness", label: "Joint Stiffness", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_joint_stiffness_joint", label: "Which Joint involved", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_joint_stiffness", equals: "Yes" } } },

          { name: "amp_gait_pattern", label: "Gait Pattern Functions", type: "radio", labelAbove: true, options: [{ label: "Spastic gait", value: "spastic" }, { label: "Hemiplegic gait", value: "hemiplegic" }, { label: "Paraplegic gait", value: "paraplegic" }, { label: "Asymmetric gait", value: "asymmetric" }, { label: "Limping gait", value: "limping" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "PROSTHETIC FIT & TOLERANCE", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_socket_fit", label: "Socket Fit", type: "radio", options: [{ label: "Good", value: "good" }, { label: "Poor", value: "poor" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_socket_fit_issue", label: "Describe Issue", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_socket_fit", equals: "poor" } } },
          { name: "amp_alignment", label: "Alignment", type: "radio", options: [{ label: "Good", value: "good" }, { label: "Poor", value: "poor" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_alignment_issue", label: "Describe Issue", type: "input", showIf: { field: "category", includes: "amputation", and: { field: "amp_alignment", equals: "poor" } } },
          { name: "amp_bony_prominence", label: "Bony Prominence / Pressure Sensitive Areas", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_bony_prominence_draw", label: "Body map (draw)", type: "draw-canvas", backgroundImage: humanBodyImage, width: 320, height: 260, showIf: { field: "category", includes: "amputation", and: { field: "amp_bony_prominence", equals: "Yes" } } },

          { type: "subheading", label: "Activities & Participation", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_changing_body_position", label: "Changing body position", type: "scale-table", rows: ["Lying → Sitting", "Squatting / Kneeling", "Sit → Stand", "Rolling", "Bending", "Weight shifting"], columns: [{ label: "Independent", value: "independent" }, { label: "Supervision", value: "supervision" }, { label: "Min Assist", value: "min_assist" }, { label: "Mod Assist", value: "mod_assist" }, { label: "Max Assist", value: "max_assist" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_maintaining_body_position", label: "Maintaining Body Position", type: "radio", options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_transferring", label: "Transferring Oneself", type: "radio", labelAbove: true, options: [{ label: "Independent", value: "independent" }, { label: "Supervision", value: "supervision" }, { label: "Contact Guard Assist", value: "contact_guard" }, { label: "Minimal Assist", value: "minimal_assist" }, { label: "Moderate Assist", value: "moderate_assist" }, { label: "Maximal Assist", value: "maximal_assist" }, { label: "Total Assist", value: "total_assist" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Walking", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_walking_short", label: "Walking Short Distance", type: "radio", labelAbove: true, options: [{ label: "Without aid", value: "without_aid" }, { label: "Walking frame", value: "walking_frame" }, { label: "Axillary crutches", value: "axillary_crutches" }, { label: "Elbow crutches", value: "elbow_crutches" }, { label: "Quadripod", value: "quadripod" }, { label: "Walking stick", value: "walking_stick" }, { label: "Wheelchair", value: "wheelchair" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_walking_long", label: "Walking Long Distance", type: "radio", labelAbove: true, options: [{ label: "Without aid", value: "without_aid" }, { label: "Walking frame", value: "walking_frame" }, { label: "Axillary crutches", value: "axillary_crutches" }, { label: "Elbow crutches", value: "elbow_crutches" }, { label: "Quadripod", value: "quadripod" }, { label: "Walking stick", value: "walking_stick" }, { label: "Wheelchair", value: "wheelchair" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Dressing", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_dressing_prosthesis", label: "(Donning / Doffing Prosthesis)", type: "radio", options: [{ label: "Independent", value: "independent" }, { label: "Assisted", value: "assisted" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_technique_acceptable", label: "Technique acceptable", type: "radio", options: ["Yes", "No"], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Environmental Factors", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_assistive_products", label: "Assistive Products", type: "radio", labelAbove: true, options: [{ label: "Wheelchair", value: "wheelchair" }, { label: "Walking frame", value: "walking_frame" }, { label: "Axillary crutches", value: "axillary_crutches" }, { label: "Elbow crutches", value: "elbow_crutches" }, { label: "Quadripod", value: "quadripod" }, { label: "Walking stick", value: "walking_stick" }], showIf: { field: "category", includes: "amputation" } },
          { name: "amp_family_support", label: "Family Support", type: "radio", options: [{ label: "Facilitator", value: "facilitator" }, { label: "Neutral", value: "neutral" }, { label: "Barrier", value: "barrier" }], showIf: { field: "category", includes: "amputation" } },

          { type: "subheading", label: "Environmental Accessibility", showIf: { field: "category", includes: "amputation" } },
          { name: "amp_building_access", label: "Building access", type: "radio", options: [{ label: "Stairs – Barrier", value: "stairs_barrier" }, { label: "Ramp available", value: "ramp_available" }, { label: "Lift available", value: "lift_available" }], showIf: { field: "category", includes: "amputation" } },
        ],
      },
    ],
  };

  const handleChange = (name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };

      const isSciSelected = Array.isArray(next.category) && next.category.includes("sci");
      next.is_sci_selected = isSciSelected;
      if (isSciSelected && next.pe_strength_assessment === "myotome_testing") {
        next.pe_strength_assessment = "mrc_scale";
      }

      if (onChange) onChange(next);
      return next;
    });
  };

  const PHYSICAL_SCHEMA_RENDER = useMemo(() => {
    const category = values?.category;
    const shouldHideSensoryAndCranial =
      Array.isArray(category) && (category.includes("sci") || category.includes("amputation"));

    if (!shouldHideSensoryAndCranial) return PHYSICAL_SCHEMA;

    const sections = (PHYSICAL_SCHEMA?.sections || []).map((section) => {
      const fields = section?.fields || [];
      const startIdx = fields.findIndex(
        (f) => f?.type === "subheading" && f?.label === "Sensory Examination (General)"
      );
      const endIdx = fields.findIndex(
        (f) => f?.type === "subheading" && f?.label === "Coordination and cerebellar function"
      );

      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return section;

      return {
        ...section,
        fields: [...fields.slice(0, startIdx), ...fields.slice(endIdx)],
      };
    });

    return { ...PHYSICAL_SCHEMA, sections };
  }, [values?.category]);

  return (
    <div style={styles.container}>
      <CommonFormBuilder
        schema={PHYSICAL_SCHEMA_RENDER}
        values={values}
        onChange={handleChange}
        assessmentRegistry={PHYSICAL_ASSESSMENT_REGISTRY}
      />
    </div>
  );
}
