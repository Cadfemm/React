import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function EyeAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const labelStyle = { display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 4 };
  const subheadStyle = { fontWeight: 600, fontSize: 13, marginBottom: 6 };
  const specifyInputStyle = {
    border: "none",
    borderBottom: "1px solid #aaa",
    outline: "none",
    width: 130,
    fontSize: 14,
    padding: "0 2px",
    background: "transparent"
  };

  const EYE_SCHEMA = {
    title: "Eye Assessment",
    sections: [
      // ─────────────────────────────────────────────
      // EYE HISTORY
      // ─────────────────────────────────────────────
      {
        title: "EYE HISTORY",
        fields: [
          {
            // Multiple symptoms can coexist → checkbox
            name: "eye_vision_symptoms",
            label: "Vision Symptoms",
            type: "checkbox-group",
            columns: 2,
            options: [
              { label: "No visual complaints", value: "none", exclusive: true },
              { label: "Difficulty focusing", value: "difficulty_focusing" },
              { label: "Blurred vision", value: "blurred" },
              { label: "Night vision difficulty", value: "night_vision" },
              { label: "Double vision (diplopia)", value: "diplopia" },
              { label: "Eye fatigue", value: "eye_fatigue" },
              { label: "Loss of vision", value: "loss" }
            ]
          },
          {
            // Multiple discomforts can coexist → checkbox; None is exclusive
            name: "eye_discomfort",
            label: "Eye Discomfort",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Eye pain", value: "pain" },
              { label: "Burning", value: "burning" },
              { label: "Itching", value: "itching" },
              { label: "Foreign body sensation", value: "foreign_body" },
              { label: "Pressure", value: "pressure" }
            ]
          },
          {
            // Multiple findings can coexist → checkbox; None is exclusive
            name: "eye_redness_discharge",
            label: "Redness / Discharge",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Redness", value: "redness" },
              { label: "Excessive tearing", value: "tearing" },
              { label: "Discharge", value: "discharge" },
              { label: "Dry eyes", value: "dry_eyes" }
            ]
          },
          {
            // No photophobia OR Photophobia present — mutually exclusive → radio, side-by-side (2 options)
            name: "eye_light_sensitivity",
            label: "Light Sensitivity",
            type: "radio",
            position: "side",
            options: [
              { label: "No photophobia", value: "no_photophobia" },
              { label: "Photophobia present", value: "photophobia_present" }
            ]
          },
          {
            // Multiple history items can be true → checkbox; "Known eye disease" has specify below
            name: "eye_history_custom",
            type: "custom",
            render: ({ values, onChange }) => {
              const checked = values["eye_history"] || [];
              const toggle = (val) => {
                const next = checked.includes(val)
                  ? checked.filter((v) => v !== val)
                  : [...checked, val];
                onChange("eye_history", next);
              };
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Eye History</label>
                  {[
                    { label: "Wears glasses", value: "glasses" },
                    { label: "Wears contact lenses", value: "contacts" },
                    { label: "Eye surgery history", value: "surgery" },
                    { label: "Eye trauma history", value: "trauma" }
                  ].map((item) => (
                    <label key={item.value} style={labelStyle}>
                      <input type="checkbox" checked={checked.includes(item.value)} onChange={() => toggle(item.value)} />
                      {item.label}
                    </label>
                  ))}
                  <label style={labelStyle}>
                    <input type="checkbox" checked={checked.includes("eye_disease")} onChange={() => toggle("eye_disease")} />
                    Known eye disease — specify:
                  </label>
                  {checked.includes("eye_disease") && (
                    <input
                      type="text"
                      value={values["eye_history_disease_specify"] || ""}
                      onChange={(e) => onChange("eye_history_disease_specify", e.target.value)}
                      placeholder="Specify eye disease"
                      style={{
                        marginLeft: 24,
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: 14,
                        width: "300px"
                      }}
                    />
                  )}
                </div>
              );
            }
          }
        ]
      },

      // ─────────────────────────────────────────────
      // CLINICAL EXAMINATION
      // ─────────────────────────────────────────────
      {
        title: "CLINICAL EXAMINATION",
        fields: [
          {
            // Multiple findings can coexist → checkbox
            name: "eye_external_structures",
            label: "External Eye Structures",
            type: "checkbox-group",
            columns: 2,
            options: [
              { label: "Eyelids symmetrical", value: "symmetrical" },
              { label: "Redness", value: "redness" },
              { label: "Eyelid swelling", value: "swelling" },
              { label: "Lesions", value: "lesions" },
              { label: "Ptosis", value: "ptosis" }
            ]
          },
          {
            // Multiple findings can coexist → checkbox
            name: "eye_sclera_conjunctiva",
            label: "Sclera / Conjunctiva",
            type: "checkbox-group",
            columns: 2,
            options: [
              { label: "Sclera white", value: "sclera_white" },
              { label: "Conjunctival redness", value: "conjunctival_redness" },
              { label: "Scleral icterus", value: "scleral_icterus" },
              { label: "Conjunctival swelling", value: "conjunctival_swelling" },
              { label: "Conjunctiva pink", value: "conjunctiva_pink" }
            ]
          },
          {
            // Pupils: custom layout with radio pairs + checkbox response + inline mm
            name: "eye_pupils_section",
            type: "custom",
            render: ({ values, onChange }) => {
              // Equal/Unequal → radio (mutually exclusive)
              // Round/Irregular → radio (mutually exclusive)
              // Clear/Cloudy → radio (mutually exclusive)
              // Response items → checkbox (can have direct + consensual + accommodation)
              // Non-reactive → exclusive radio within response
              const response = values["eye_pupil_response"] || [];
              const toggleResponse = (val) => {
                if (val === "non_reactive") {
                  // Non-reactive is exclusive
                  onChange("eye_pupil_response", response.includes("non_reactive") ? [] : ["non_reactive"]);
                } else {
                  const filtered = response.filter((v) => v !== "non_reactive");
                  const next = filtered.includes(val)
                    ? filtered.filter((v) => v !== val)
                    : [...filtered, val];
                  onChange("eye_pupil_response", next);
                }
              };

              return (
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Pupils</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                    {/* Left: Size & Shape */}
                    <div>
                      <div style={subheadStyle}>Size &amp; Shape</div>

                      {/* Equal / Unequal — mutually exclusive → radio */}
                      {[
                        { label: "Equal", value: "equal" },
                        { label: "Unequal (anisocoria)", value: "unequal" }
                      ].map((item) => (
                        <label key={item.value} style={labelStyle}>
                          <input
                            type="radio"
                            name="eye_pupil_equality"
                            checked={values["eye_pupil_equality"] === item.value}
                            onChange={() => onChange("eye_pupil_equality", item.value)}
                          />
                          {item.label}
                        </label>
                      ))}

                      {/* Round / Irregular — mutually exclusive → radio */}
                      {[
                        { label: "Round", value: "round" },
                        { label: "Irregular", value: "irregular" }
                      ].map((item) => (
                        <label key={item.value} style={labelStyle}>
                          <input
                            type="radio"
                            name="eye_pupil_shape"
                            checked={values["eye_pupil_shape"] === item.value}
                            onChange={() => onChange("eye_pupil_shape", item.value)}
                          />
                          {item.label}
                        </label>
                      ))}

                      {/* Pupil size mm inline */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, margin: "6px 0" }}>
                        Size:
                        <input
                          type="text"
                          value={values["eye_pupil_size_mm"] || ""}
                          onChange={(e) => onChange("eye_pupil_size_mm", e.target.value)}
                          style={{ ...specifyInputStyle, width: 60 }}
                        />
                        mm
                      </div>

                      {/* Clear / Cloudy — mutually exclusive → radio */}
                      {[
                        { label: "Clear", value: "clear" },
                        { label: "Cloudy", value: "cloudy" }
                      ].map((item) => (
                        <label key={item.value} style={labelStyle}>
                          <input
                            type="radio"
                            name="eye_pupil_clarity"
                            checked={values["eye_pupil_clarity"] === item.value}
                            onChange={() => onChange("eye_pupil_clarity", item.value)}
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>

                    {/* Right: Response */}
                    <div>
                      <div style={subheadStyle}>Response</div>
                      {/* Reactive options → checkbox (can have multiple) */}
                      {[
                        { label: "Reactive — direct", value: "reactive_direct" },
                        { label: "Reactive — consensual", value: "reactive_consensual" },
                        { label: "Accommodation present", value: "accommodation" }
                      ].map((item) => (
                        <label key={item.value} style={labelStyle}>
                          <input
                            type="checkbox"
                            checked={response.includes(item.value)}
                            onChange={() => toggleResponse(item.value)}
                          />
                          {item.label}
                        </label>
                      ))}
                      {/* Non-reactive → exclusive */}
                      <label style={labelStyle}>
                        <input
                          type="checkbox"
                          checked={response.includes("non_reactive")}
                          onChange={() => toggleResponse("non_reactive")}
                        />
                        Non-reactive
                      </label>

                      {/* PERRLA summary checkbox */}
                      <label style={{ ...labelStyle, fontWeight: 700, marginTop: 12 }}>
                        <input
                          type="checkbox"
                          checked={values["eye_perrla_summary"] || false}
                          onChange={() => onChange("eye_perrla_summary", !values["eye_perrla_summary"])}
                        />
                        PERRLA (summary)
                      </label>
                    </div>
                  </div>

                 
                </div>
              );
            }
          },
          {
            // Multiple EOM findings can coexist; Full ROM is exclusive
            name: "eye_eom",
            label: "Extraocular Movements (CN III, IV, VI)",
            type: "checkbox-group",
            options: [
              { label: "Full ROM", value: "full_rom", exclusive: true },
              { label: "Limited ROM", value: "limited_rom" },
              { label: "Nystagmus present", value: "nystagmus" },
              { label: "Strabismus present", value: "strabismus" },
              { label: "Pain with movement", value: "pain_movement" }
            ]
          },
          {
            // Visual Tracking: 2 options → side-by-side
            name: "eye_visual_tracking",
            label: "Visual Tracking",
            type: "radio",
            position: "side",
            options: [
              { label: "Tracks smoothly", value: "smoothly" },
              { label: "Unable to track", value: "unable" }
            ]
          },
          {
            // Corneal Clarity: 2 options → side-by-side
            name: "eye_corneal_clarity",
            label: "Corneal Clarity",
            type: "radio",
            position: "side",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" }
            ]
          },
          {
            // Intact OR Deficit — mutually exclusive → radio; Deficit shows specify below
            name: "eye_visual_fields_section",
            type: "custom",
            render: ({ values, onChange }) => (
              <div>
                <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: "block" }}>
                  Visual Fields (Confrontation)
                </label>
                <label style={labelStyle}>
                  <input
                    type="radio"
                    name="eye_visual_fields"
                    checked={values["eye_visual_fields"] === "intact"}
                    onChange={() => onChange("eye_visual_fields", "intact")}
                  />
                  Intact all quadrants
                </label>
                <label style={labelStyle}>
                  <input
                    type="radio"
                    name="eye_visual_fields"
                    checked={values["eye_visual_fields"] === "deficit"}
                    onChange={() => onChange("eye_visual_fields", "deficit")}
                  />
                  Deficit — specify:
                </label>
                {values["eye_visual_fields"] === "deficit" && (
                  <input
                    type="text"
                    value={values["eye_visual_fields_specify"] || ""}
                    onChange={(e) => onChange("eye_visual_fields_specify", e.target.value)}
                    placeholder="Specify deficit"
                    style={{
                      marginLeft: 24,
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: 14,
                      width: "300px"
                    }}
                  />
                )}
              </div>
            )
          },
          {
            // PERRLA normal OR Abnormal — mutually exclusive → radio; Abnormal shows specify below
            name: "eye_overall_summary_section",
            type: "custom",
            render: ({ values, onChange }) => (
              <div>
                <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, display: "block" }}>
                  Overall Summary
                </label>
                <label style={{ ...labelStyle, fontWeight: 600 }}>
                  <input
                    type="radio"
                    name="eye_overall_summary"
                    checked={values["eye_overall_summary"] === "perrla"}
                    onChange={() => onChange("eye_overall_summary", "perrla")}
                  />
                  PERRLA — all findings normal
                </label>
                <label style={labelStyle}>
                  <input
                    type="radio"
                    name="eye_overall_summary"
                    checked={values["eye_overall_summary"] === "abnormal"}
                    onChange={() => onChange("eye_overall_summary", "abnormal")}
                  />
                  Abnormal — specify:
                </label>
                {values["eye_overall_summary"] === "abnormal" && (
                  <input
                    type="text"
                    value={values["eye_summary_abnormal_specify"] || ""}
                    onChange={(e) => onChange("eye_summary_abnormal_specify", e.target.value)}
                    placeholder="Specify abnormal findings"
                    style={{
                      marginLeft: 24,
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: 14,
                      width: "300px"
                    }}
                  />
                )}
              </div>
            )
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EYE_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
