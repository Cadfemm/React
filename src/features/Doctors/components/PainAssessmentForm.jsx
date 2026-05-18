import React, { useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import humanBodyImage from "../../../assets/Human Body.jpg";
import faces0 from "../../../assets/faces-0.png";
import faces2 from "../../../assets/faces-2.png";
import faces4 from "../../../assets/faces-4.png";
import faces6 from "../../../assets/faces-6.png";
import faces8 from "../../../assets/faces-8.png";
import faces10 from "../../../assets/faces-10.png";
import OswestryLowBackPainAssessment from "./OswestryLowBackPainAssessment";
import BriefPainInventoryAssessment from "./BriefPainInventoryAssessment";
import KOOSKneeSurvey from "./KOOSKneeSurvey";
import SPADIShoulderAssessment from "./SPADIShoulderAssessment";
import BCTQAssessment from "./BCTQAssessment";


export default function PainAssessmentForm({ values, onChange }) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentValues, setAssessmentValues] = useState({});
  const schema = useMemo(() => {
    return {
      title: "",
      sections: [
        {
          fields: [
            { type: "subheading", label: "History Taking" },
            {
              name: "wound_location_pins", label: "Mark Wound Location on Body Diagram",
              type: "wound-location-marker",
              views: [
                { key: "body",  label: "Body (Front/Back)", src: "/body_high.png" },
                { key: "feet",  label: "Feet",             src: "/feet_high.png" },
                { key: "handsfeet", label: "Hands",              src: "/palm.png" }
              ]
            },
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
              showIf: {
                  or: [
                    { field: "pain_type", equals: "nociceptive" },
                    { field: "pain_type", equals: "mixed" }
                  ]
                }
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
              showIf: {
                  or: [
                    { field: "pain_type", equals: "neuropathic" },
                    { field: "pain_type", equals: "mixed" }
                  ]
                }
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
            name: "pain_associated_specify",
            label: "Specify",
            type: "input",
            showIf: {
              or: [
                { field: "pain_associated_symptoms", includes: "numbness" },
                { field: "pain_associated_symptoms", includes: "tingling" },
                { field: "pain_associated_symptoms", includes: "allodynia" },
                { field: "pain_associated_symptoms", includes: "hyperalgesia" },
                { field: "pain_associated_symptoms", includes: "weakness" }
              ]
            }
          },
          ],
        },
      ],
    };
  }, []);

  const PAIN_SCALE_REGISTRY = useMemo(() => {
    return {
      // Inline SVG faces so the MOH Faces Scale renders consistently without needing image assets.
      // Scores follow the MOH faces anchors: 0, 2, 4, 6, 8, 10.
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
        const scoreFields = ["flacc_face", "flacc_legs", "flacc_activity", "flacc_cry", "flacc_consolability"];

        const toNum = (x) => {
          if (x === null || x === undefined || x === "") return 0;
          const n = typeof x === "number" ? x : Number(x);
          return Number.isFinite(n) ? n : 0;
        };

        const recomputeTotal = (valuesObj) =>
          scoreFields.reduce((sum, key) => sum + toNum(valuesObj?.[key]), 0);

        const handleChange = (name, value) => {
          const next = { ...(v || {}), [name]: value };
          c(name, value);
          c("flacc_score", recomputeTotal(next));
        };

        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    { type: "subheading", label: "FLACC Scale" },
                    {
                      type: "grid-header",
                      label: "Category",
                      cols: ["0", "1", "2"],
                      wideLabel: true,
                    },
                    {
                      type: "radio-matrix",
                      name: "flacc_face",
                      label: "Face",
                      wideLabel: true,
                      options: [
                        { label: "0", value: 0 },
                        { label: "1", value: 1 },
                        { label: "2", value: 2 },
                      ],
                      info: {
                        title: "Face",
                        content: [
                          "0: No particular expression or smile",
                          "1: Occasional grimace or frown, withdrawn, disinterested",
                          "2: Frequent to constant quivering chin, clenched jaw",
                        ],
                      },
                    },
                    {
                      type: "radio-matrix",
                      name: "flacc_legs",
                      label: "Legs",
                      wideLabel: true,
                      options: [
                        { label: "0", value: 0 },
                        { label: "1", value: 1 },
                        { label: "2", value: 2 },
                      ],
                      info: {
                        title: "Legs",
                        content: [
                          "0: Normal position or relaxed",
                          "1: Uneasy, restless, tense",
                          "2: Kicking or legs drawn up",
                        ],
                      },
                    },
                    {
                      type: "radio-matrix",
                      name: "flacc_activity",
                      label: "Activity",
                      wideLabel: true,
                      options: [
                        { label: "0", value: 0 },
                        { label: "1", value: 1 },
                        { label: "2", value: 2 },
                      ],
                      info: {
                        title: "Activity",
                        content: [
                          "0: Lying quietly, normal position, moves easily",
                          "1: Squirming, shifting back and forth, tense",
                          "2: Arched, rigid or jerking",
                        ],
                      },
                    },
                    {
                      type: "radio-matrix",
                      name: "flacc_cry",
                      label: "Cry",
                      wideLabel: true,
                      options: [
                        { label: "0", value: 0 },
                        { label: "1", value: 1 },
                        { label: "2", value: 2 },
                      ],
                      info: {
                        title: "Cry",
                        content: [
                          "0: No cry (awake or asleep)",
                          "1: Moans or whimpers; occasional complaint",
                          "2: Crying steadily, screams or sobs, frequent complaints",
                        ],
                      },
                    },
                    {
                      type: "radio-matrix",
                      name: "flacc_consolability",
                      label: "Consolability",
                      wideLabel: true,
                      options: [
                        { label: "0", value: 0 },
                        { label: "1", value: 1 },
                        { label: "2", value: 2 },
                      ],
                      info: {
                        title: "Consolability",
                        content: [
                          "0: Content, relaxed",
                          "1: Reassured by occasional touching, hugging or being talked to, distractible",
                          "2: Difficult to console",
                        ],
                      },
                    },
                    {
                      name: "flacc_score",
                      label: "Total FLACC Score (0–10)",
                      type: "score-box",
                    },
                  ],
                },
              ],
            }}
            values={v}
            onChange={handleChange}
            layout="nested"
          />
        );
      },
      moh_faces_scale: function MOHFacesScale({ values: v, onChange: c }) {
        const selected = v?.moh_faces_scale_score;
        const setScore = (score) => c("moh_faces_scale_score", score);

        const facesByScore = {
          0: faces0,
          2: faces2,
          4: faces4,
          6: faces6,
          8: faces8,
          10: faces10,
        };

        const options = [0, 2, 4, 6, 8, 10];
        const descriptions = {
          0: "Face 0 is very happy because he doesn’t hurt at all.",
          2: "Face 2 hurts just a little.",
          4: "Face 4 hurts a little more.",
          6: "Face 6 hurts even more.",
          8: "Face 8 hurts a whole lot.",
          10: "Face 10 hurts as much as you can imagine, although you don’t have to be crying to feel this bad.",
        };

        return (
          <div style={{ width: "100%" }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>MOH Faces Scale</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
              {options.map((score) => {
                const isActive = Number(selected) === score;
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setScore(score)}
                    style={{
                      border: isActive ? "2px solid #2563eb" : "1px solid #e5e7eb",
                      background: isActive ? "#eff6ff" : "#ffffff",
                      borderRadius: 12,
                      padding: "10px 10px 8px",
                      cursor: "pointer",
                      minWidth: 110,
                      boxShadow: isActive ? "0 0 0 3px rgba(37,99,235,0.15)" : "none",
                    }}
                    aria-pressed={isActive}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={facesByScore[score]}
                        alt={`face-${score}`}
                        style={{
                          width: 96,
                          height: 64,
                          objectFit: "contain",
                          background: "#fff",
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 6, fontWeight: 800, textAlign: "center", color: "#111827" }}>
                      {score}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 12, fontWeight: 700 }}>
              Selected score: <span style={{ fontWeight: 900 }}>{selected ?? ""}</span>
            </div>

            {selected !== undefined && selected !== null && selected !== "" && (
              <div
                style={{
                  marginTop: 10,
                  padding: 12,
                  border: "1px solid #bfdbfe",
                  borderRadius: 10,
                  background: "#eff6ff",
                  color: "#111827",
                  fontWeight: 700,
                }}
              >
                {descriptions[Number(selected)] || ""}
              </div>
            )}
          </div>
        );
      },
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        assessmentRegistry={PAIN_SCALE_REGISTRY}
        layout="nested"
      />

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: "2px solid #e5e7eb" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Additional Pain Assessments</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => setSelectedAssessment("oswestry")}
            style={{
              padding: "10px 16px",
              border: selectedAssessment === "oswestry" ? "2px solid #2563eb" : "1px solid #d1d5db",
              background: selectedAssessment === "oswestry" ? "#eff6ff" : "#ffffff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              color: selectedAssessment === "oswestry" ? "#1e40af" : "#374151"
            }}
          >
            Oswestry Low Back Pain
          </button>
          {/* <button
            onClick={() => setSelectedAssessment("bpi")}
            style={{
              padding: "10px 16px",
              border: selectedAssessment === "bpi" ? "2px solid #2563eb" : "1px solid #d1d5db",
              background: selectedAssessment === "bpi" ? "#eff6ff" : "#ffffff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              color: selectedAssessment === "bpi" ? "#1e40af" : "#374151"
            }}
          >
            Brief Pain Inventory
          </button> */}
          <button
            onClick={() => setSelectedAssessment("koos")}
            style={{
              padding: "10px 16px",
              border: selectedAssessment === "koos" ? "2px solid #2563eb" : "1px solid #d1d5db",
              background: selectedAssessment === "koos" ? "#eff6ff" : "#ffffff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              color: selectedAssessment === "koos" ? "#1e40af" : "#374151"
            }}
          >
            KOOS Knee Survey
          </button>
          <button
            onClick={() => setSelectedAssessment("spadi")}
            style={{
              padding: "10px 16px",
              border: selectedAssessment === "spadi" ? "2px solid #2563eb" : "1px solid #d1d5db",
              background: selectedAssessment === "spadi" ? "#eff6ff" : "#ffffff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              color: selectedAssessment === "spadi" ? "#1e40af" : "#374151"
            }}
          >
            SPADI Shoulder
          </button>
          <button
            onClick={() => setSelectedAssessment("bctq")}
            style={{
              padding: "10px 16px",
              border: selectedAssessment === "bctq" ? "2px solid #2563eb" : "1px solid #d1d5db",
              background: selectedAssessment === "bctq" ? "#eff6ff" : "#ffffff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              color: selectedAssessment === "bctq" ? "#1e40af" : "#374151"
            }}
          >
            Boston Carpal Tunnel Syndrome
          </button>
        </div>

        {selectedAssessment === "oswestry" && (
          <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
            <OswestryLowBackPainAssessment values={assessmentValues} onChange={(name, value) => setAssessmentValues(prev => ({ ...prev, [name]: value }))} />
          </div>
        )}
        {selectedAssessment === "bpi" && (
          <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
            <BriefPainInventoryAssessment values={assessmentValues} onChange={(name, value) => setAssessmentValues(prev => ({ ...prev, [name]: value }))} />
          </div>
        )}
        {selectedAssessment === "koos" && (
          <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
            <KOOSKneeSurvey values={assessmentValues} onChange={(name, value) => setAssessmentValues(prev => ({ ...prev, [name]: value }))} />
          </div>
        )}
        {selectedAssessment === "spadi" && (
          <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
            <SPADIShoulderAssessment values={assessmentValues} onChange={(name, value) => setAssessmentValues(prev => ({ ...prev, [name]: value }))} />
          </div>
        )}
        {selectedAssessment === "bctq" && (
          <div style={{ marginTop: 20, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
            <BCTQAssessment values={assessmentValues} onChange={(name, value) => setAssessmentValues(prev => ({ ...prev, [name]: value }))} />
          </div>
        )}
      </div>
    </div>
  );
}

