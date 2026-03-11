import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import humanBodyImage from "../../../assets/Human Body.jpg";

export default function PainAssessmentForm({ values, onChange }) {
  const schema = useMemo(() => {
    return {
      title: "",
      sections: [
        {
          fields: [
            { type: "subheading", label: "History Taking" },
            {
              name: "pain_site_drawing",
              label: "Site of Pain (draw)",
              type: "draw-canvas",
              backgroundImage: humanBodyImage,
              width: 520,
              height: 420,
            },
            { name: "pain_history_specify", label: "Specify", type: "textarea" },
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
              showIf: { field: "pain_type", equals: "nociceptive" },
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
              showIf: { field: "pain_type", equals: "neuropathic" },
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
              name: "pain_associated_numbness_specify",
              label: "Numbness - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "numbness" },
            },
            {
              name: "pain_associated_tingling_specify",
              label: "Tingling - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "tingling" },
            },
            {
              name: "pain_associated_allodynia_specify",
              label: "Allodynia - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "allodynia" },
            },
            {
              name: "pain_associated_hyperalgesia_specify",
              label: "Hyperalgesia - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "hyperalgesia" },
            },
            {
              name: "pain_associated_weakness_specify",
              label: "Weakness - Specify",
              type: "input",
              showIf: { field: "pain_associated_symptoms", includes: "weakness" },
            },
          ],
        },
      ],
    };
  }, []);

  const PAIN_SCALE_REGISTRY = useMemo(() => {
    return {
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
        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    { type: "subheading", label: "FLACC Scale" },
                    {
                      name: "flacc_score",
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
      moh_faces_scale: function MOHFacesScale({ values: v, onChange: c }) {
        return (
          <CommonFormBuilder
            schema={{
              title: "",
              sections: [
                {
                  fields: [
                    { type: "subheading", label: "MOH Faces Scale" },
                    {
                      name: "moh_faces_scale_score",
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
    </div>
  );
}

