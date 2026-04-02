import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import spasticity1 from "../../../assets/spasticity1.png";
import spasticity2 from "../../../assets/spasticity2.png";
import spasticity3 from "../../../assets/spasticity3.jpg";

const yesNo = ["Yes", "No"];

const MAS_OPTIONS = [
  { score: "0", text: "No increase in tone" },
  { score: "1", text: "Slight increase in tone; catch/release at end ROM" },
  { score: "1+", text: "Slight increase in tone; catch/release through 1/2 ROM" },
  { score: "2", text: "Marked increase in tone through ROM; part moved easily" },
  { score: "3", text: "Considerable increase in tone; passive movement difficult" },
  { score: "4", text: "Part rigid in flexion/extension" },
];

const PENN_OPTIONS = [
  { score: "0", text: "No spasms" },
  { score: "1", text: "Mild spasms induced by stimulation" },
  { score: "2", text: "Infrequent spasms occurring less than once per hour" },
  { score: "3", text: "Spasms occurring more than once per hour" },
  { score: "4", text: "Spasms occurring more than 10 times per hour" },
];

const MAS_TABLE_OPTIONS = [
  { label: "0 - No increase in tone", value: "0_no" },
  { label: "1 - Slight increase in tone. Catch/Release at end ROM", value: "1" },
  { label: "1+ - Slight increase in tone. Catch/Release and resistance through rest ROM (1/2 ROM)", value: "1+" },
  { label: "2 - More marked increase in tone through ROM, but affected part moved easily", value: "2" },
  { label: "3 - Considerable increase in tone, passive movement difficult", value: "3" },
  { label: "4 - Affected part in rigid flexion and extension", value: "4" },
];

function ModifiedAshworthAssessment({ values, onChange }) {
  const selected = String(values?.spasticity_mas_score || "");
  const selectedText = MAS_OPTIONS.find((opt) => opt.score === selected)?.text || "";
  const scoreInterpretation = selected ? `${selected} - ${selectedText}` : "";

  useEffect(() => {
    if ((values?.spasticity_mas_score_interpretation || "") !== scoreInterpretation) {
      onChange("spasticity_mas_score_interpretation", scoreInterpretation);
    }
  }, [scoreInterpretation, values?.spasticity_mas_score_interpretation, onChange]);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Modified Ashworth Scale (MAS)</div>
      {MAS_OPTIONS.map((opt) => (
        <button
          key={opt.score}
          type="button"
          onClick={() => onChange("spasticity_mas_score", opt.score)}
          style={{
            width: "100%",
            textAlign: "left",
            marginBottom: 8,
            padding: "8px 10px",
            borderRadius: 8,
            border: selected === opt.score ? "2px solid #2563eb" : "1px solid #d1d5db",
            background: selected === opt.score ? "#eff6ff" : "#ffffff",
            color: "#0f172a",
            cursor: "pointer",
          }}
        >
          {opt.score} - {opt.text}
        </button>
      ))}
      {scoreInterpretation ? <div style={{ fontWeight: 700, marginTop: 8 }}>{scoreInterpretation}</div> : null}
    </div>
  );
}

function MTSAssessment({ values, onChange }) {
  const r1 = Number(values?.spasticity_mts_r1 || 0);
  const r2 = Number(values?.spasticity_mts_r2 || 0);
  const hasBoth = String(values?.spasticity_mts_r1 || "").trim() && String(values?.spasticity_mts_r2 || "").trim();
  const dynamicComponent = hasBoth ? String(r2 - r1) : "";

  useEffect(() => {
    if ((values?.spasticity_mts_dynamic_component || "") !== dynamicComponent) {
      onChange("spasticity_mts_dynamic_component", dynamicComponent);
    }
  }, [dynamicComponent, values?.spasticity_mts_dynamic_component, onChange]);

  const schema = {
    fields: [
      { type: "input", name: "spasticity_mts_r1", label: "R1 - Angle of catch" },
      { type: "input", name: "spasticity_mts_r2", label: "R2 - Passive ROM" },
      { type: "input", name: "spasticity_mts_dynamic_component", label: "R2 - R1", readOnly: true },
    ],
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Modified Tardieu Scale (MTS)</div>
      <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />
    </div>
  );
}

function PennAssessment({ values, onChange }) {
  const selected = String(values?.spasm_penn_frequency_score || "");
  const selectedText = PENN_OPTIONS.find((opt) => opt.score === selected)?.text || "";
  const scoreInterpretation = selected ? `${selected} - ${selectedText}` : "";

  useEffect(() => {
    if ((values?.spasm_penn_frequency_interpretation || "") !== scoreInterpretation) {
      onChange("spasm_penn_frequency_interpretation", scoreInterpretation);
    }
  }, [scoreInterpretation, values?.spasm_penn_frequency_interpretation, onChange]);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Penn Spasm Frequency Scale (PSFS)</div>
      {PENN_OPTIONS.map((opt) => (
        <button
          key={opt.score}
          type="button"
          onClick={() => onChange("spasm_penn_frequency_score", opt.score)}
          style={{
            width: "100%",
            textAlign: "left",
            marginBottom: 8,
            padding: "8px 10px",
            borderRadius: 8,
            border: selected === opt.score ? "2px solid #2563eb" : "1px solid #d1d5db",
            background: selected === opt.score ? "#eff6ff" : "#ffffff",
            color: "#0f172a",
            cursor: "pointer",
          }}
        >
          {opt.score} - {opt.text}
        </button>
      ))}
      {scoreInterpretation ? <div style={{ fontWeight: 700, marginTop: 8 }}>{scoreInterpretation}</div> : null}
    </div>
  );
}

function SpasticityReferenceImages() {
  const imageStyle = {
    width: "100%",
    maxWidth: 760,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
    display: "block",
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 10 }}>Spasticity Reference Images</div>
      <img src={spasticity1} alt="Spasticity reference 1" style={imageStyle} />
      <img src={spasticity2} alt="Spasticity reference 2" style={imageStyle} />
      <img src={spasticity3} alt="Spasticity reference 3" style={imageStyle} />
    </div>
  );
}

const SPASM_SPASTICITY_REGISTRY = {
  modified_ashworth: ModifiedAshworthAssessment,
  mts: MTSAssessment,
  penn_scale: PennAssessment,
  spasticity_reference_images: SpasticityReferenceImages,
};

const SPASM_SPASTICITY_SCHEMA = {
  sections: [
    {
      title: "Spasticity",
      fields: [
        // Add Yes/No radio button for Spasticity presence
        { 
          type: "radio", 
          name: "spasticity_present", 
          label: "Spasticity", 
          options: yesNo 
        },
        {
          type: "radio",
          name: "spasticity_pain_severity",
          label: "Severity",
          options: ["Mild", "Moderate", "Severe"],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_symptoms", includes: "pain_associated_spasticity" }
          },
        },
        { type: "subheading", label: "Onset & Duration", showIf: { field: "spasticity_present", equals: "Yes" } },
        {
          type: "radio",
          name: "spasticity_onset",
          label: "Onset",
          options: ["Post Stroke", "Cerebral Palsy", "Spinal Cord Injury", "Other"],
          labelAbove: true,
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "input",
          name: "spasticity_onset_other_specify",
          label: "Onset - Other (Specify)",
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_onset", equals: "Other" }
          },
        },
        {
          type: "radio",
          name: "spasticity_duration",
          label: "Duration",
          options: ["< 1 month", "1-3 months", "> 3 months", "Chronic"],
          labelAbove: true,
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "checkbox-group",
          name: "spasticity_functional_complaints",
          label: "Functional Complaints",
          options: [
            { label: "Difficulty walking", value: "difficulty_walking" },
            { label: "Difficulty in hand use", value: "difficulty_hand_use" },
            { label: "Difficulty in positioning", value: "difficulty_positioning" },
            { label: "Difficulty in hygiene", value: "difficulty_hygiene" },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "radio",
          name: "spasticity_distribution",
          label: "Distribution",
          options: ["Upper limb", "Lower limb", "Generalized"],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "checkbox-group",
          name: "spasticity_muscle_groups_upper",
          label: "Muscle Groups Involved",
          options: [
            { label: "Shoulder", value: "shoulder" },
            { label: "Elbow", value: "elbow" },
            { label: "Wrist", value: "wrist" },
            { label: "Hand", value: "hand" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_distribution", equals: "Upper limb" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_muscle_groups_lower",
          label: "Muscle Groups Involved",
          options: [
            { label: "Hip", value: "hip" },
            { label: "Knee", value: "knee" },
            { label: "Ankle", value: "ankle" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_distribution", equals: "Lower limb" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_muscle_groups_generalized",
          label: "Muscle Groups Involved",
          options: [
            { label: "Shoulder", value: "shoulder" },
            { label: "Elbow", value: "elbow" },
            { label: "Wrist", value: "wrist" },
            { label: "Hand", value: "hand" },
            { label: "Hip", value: "hip" },
            { label: "Knee", value: "knee" },
            { label: "Ankle", value: "ankle" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_distribution", equals: "Generalized" }
          },
        },
        {
          type: "radio",
          name: "spasticity_side_shoulder",
          label: "Side Involvement - Shoulder",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_upper", includes: "shoulder" },
                { field: "spasticity_muscle_groups_generalized", includes: "shoulder" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_elbow",
          label: "Side Involvement - Elbow",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_upper", includes: "elbow" },
                { field: "spasticity_muscle_groups_generalized", includes: "elbow" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_wrist",
          label: "Side Involvement - Wrist",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_upper", includes: "wrist" },
                { field: "spasticity_muscle_groups_generalized", includes: "wrist" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_hand",
          label: "Side Involvement - Hand",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_upper", includes: "hand" },
                { field: "spasticity_muscle_groups_generalized", includes: "hand" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_hip",
          label: "Side Involvement - Hip",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_lower", includes: "hip" },
                { field: "spasticity_muscle_groups_generalized", includes: "hip" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_knee",
          label: "Side Involvement - Knee",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_lower", includes: "knee" },
                { field: "spasticity_muscle_groups_generalized", includes: "knee" },
              ],
            },
          },
        },
        {
          type: "radio",
          name: "spasticity_side_ankle",
          label: "Side Involvement - Ankle",
          options: ["Right", "Left", "Bilateral"],
          showIf: {
            field: "spasticity_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasticity_muscle_groups_lower", includes: "ankle" },
                { field: "spasticity_muscle_groups_generalized", includes: "ankle" },
              ],
            },
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_associated_findings",
          label: "Associated Findings",
          options: [
            { label: "Hyperreflexia", value: "hyperreflexia" },
            { label: "Clonus", value: "clonus" },
            { label: "Contracture", value: "contracture" },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { type: "subheading", label: "Muscle Tone Assessment", showIf: { field: "spasticity_present", equals: "Yes" } },
        
        { type: "subheading", label: "Upper limb", showIf: { field: "spasticity_present", equals: "Yes" } },
        {
          type: "refraction-12col",
          name: "spasticity_muscle_tone_upper_table",
          cornerLabel: "Muscle",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: [
            { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R2)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R1)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R2-R1)", columns: [{ key: "Right" }, { key: "Left" }] },
          ],
          rows: [
            { value: "pectoralis_major", label: "Pectoralis Major", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "subscapularis", label: "Subscapularis", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "triceps", label: "Triceps", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "biceps_brachii", label: "Biceps Brachii", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "brachialis", label: "Brachialis", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "brachioradialis", label: "Brachioradialis", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "pronator_teres", label: "Pronator Teres", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fcu", label: "Flexor Carpi Ulnaris (FCU)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fcr", label: "Flexor Carpi Radialis (FCR)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fdp", label: "Flexor Digitorum Profundus (FDP)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fds", label: "Flexor Digitorum Superficialis (FDS)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fpl", label: "Flexor Pollicis Longus (FPL)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { type: "subheading", label: "Lower limb", showIf: { field: "spasticity_present", equals: "Yes" } },
        {
          type: "refraction-12col",
          name: "spasticity_muscle_tone_lower_table",
          cornerLabel: "Muscle",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: [
            { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R2)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R1)", columns: [{ key: "Right" }, { key: "Left" }] },
            { label: "Tardieu Scale (R2-R1)", columns: [{ key: "Right" }, { key: "Left" }] },
          ],
          rows: [
            { value: "bicep_femoris", label: "Bicep Femoris", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "semitendinosus", label: "Semitendinosus", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "semimembranosus", label: "Semimembranosus", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "adductors", label: "Adductors", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "gastrocnemius", label: "Gastrocnemius", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "soleus", label: "Soleus", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "posterior_tibialis", label: "Posterior Tibialis", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fdl", label: "Flexor Digitorum Longus (FDL)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
            { value: "fhl", label: "Flexor Hallucis Longus (FHL)", columns: [{ type: "select", options: MAS_TABLE_OPTIONS }, { type: "select", options: MAS_TABLE_OPTIONS }, {}, {}, {}, {}, {}, {}] },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { type: "subheading", label: "Activity & Participation", showIf: { field: "spasticity_present", equals: "Yes" } },
        {
          type: "radio",
          name: "spasticity_activity_walking",
          label: "Walking",
          options: ["Independent", "Assist", "Dependent"],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "radio",
          name: "spasticity_activity_hand_use",
          label: "Hand use",
          options: ["Functional", "Impaired"],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "radio",
          name: "spasticity_activity_position_change",
          label: "Position change",
          options: ["Independent", "Dependent"],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { type: "subheading", label: "Environmental", showIf: { field: "spasticity_present", equals: "Yes" } },
        {
          type: "radio",
          name: "spasticity_assistive_device",
          label: "Assistive device",
          options: ["None", "Walker", "Orthosis", "Wheelchair"],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { 
          type: "textarea", 
          name: "spasticity_personal_factors", 
          label: "Personal Factors",
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "checkbox-group",
          name: "spasticity_rehab_goals",
          label: "Rehabilitation Goals",
          options: [
            { label: "Reduce pain", value: "reduce_pain" },
            { label: "Improve positioning", value: "improve_positioning" },
            { label: "Prevent contracture", value: "prevent_contracture" },
            { label: "Improve ADL", value: "improve_adl" },
            { label: "Improve gait / mobility", value: "improve_gait_mobility" },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        /* ========== GOALS ========== */
        {
          type: "subheading",
          label: "Goals",
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          name: "spasticity_goals",
          type: "textarea",
          placeholder: "Enter goals",
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        { 
          type: "heading", 
          label: "Plan",
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "checkbox-group",
          name: "spasticity_plan_sections",
          label: "",
          options: [
            { label: "Physiotherapy Intervention", value: "physiotherapy_intervention" },
            { label: "Pharmacological Management", value: "pharmacological_management" },
            { label: "Occupational Therapy ADL training", value: "occupational_therapy" },
            { label: "Orthotic Management Splint / Brace prescription", value: "orthotic_management" },
            { label: "Education & Counselling Home program & Caregiver training", value: "education_counselling" },
            { label: "Follow-up Plan", value: "follow_up_plan" },
          ],
          showIf: { field: "spasticity_present", equals: "Yes" },
        },
        {
          type: "checkbox-group",
          name: "spasticity_plan_physiotherapy",
          label: "Physiotherapy Intervention",
          options: [
            { label: "Stretching", value: "stretching" },
            { label: "Positioning", value: "positioning" },
            { label: "Splinting", value: "splinting" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_sections", includes: "physiotherapy_intervention" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_plan_pharm_oral",
          label: "Oral medication",
          options: [
            { label: "Baclofen", value: "baclofen" },
            { label: "Tizanidine", value: "tizanidine" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_sections", includes: "pharmacological_management" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_plan_pharm_injection",
          label: "Injection",
          options: [{ label: "Botulinum toxin type A", value: "botulinum_toxin_type_a" }],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_sections", includes: "pharmacological_management" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_plan_botox_goals",
          label: "Botulinum toxin type A goals",
          options: [
            { label: "Pain reduction", value: "pain_reduction" },
            { label: "Improve ROM", value: "improve_rom" },
            { label: "Improve hygiene", value: "improve_hygiene" },
            { label: "Improve function", value: "improve_function" },
            { label: "Reduce caregiver burden", value: "reduce_caregiver_burden" },
            { label: "Others", value: "others" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_pharm_injection", includes: "botulinum_toxin_type_a" }
          },
        },
        {
          type: "textarea",
          name: "spasticity_plan_botox_goals_others",
          label: "Others (Specify)",
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_botox_goals", includes: "others" }
          },
        },
        {
          type: "radio",
          name: "spasticity_follow_up_review_in",
          label: "Review in",
          options: ["1 week", "2 weeks", "1 month"],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_sections", includes: "follow_up_plan" }
          },
        },
        {
          type: "checkbox-group",
          name: "spasticity_follow_up_outcome_measures",
          label: "Outcome measures to track",
          options: [
            { label: "MAS", value: "mas" },
            { label: "Penn Scale", value: "penn_scale" },
            { label: "Functional improvement", value: "functional_improvement" },
          ],
          showIf: { 
            field: "spasticity_present", 
            equals: "Yes",
            and: { field: "spasticity_plan_sections", includes: "follow_up_plan" }
          },
        },
      ],
    },
    
    {
      title: "Spasm",
      fields: [
        { type: "radio", name: "spasm_present", label: "Spasms", options: yesNo },
        { type: "subheading", label: "Symptoms", showIf: { field: "spasm_present", equals: "Yes" } },
        {
          type: "checkbox-group",
          name: "spasm_sites",
          label: "Site",
          options: [
            { label: "Lower limbs", value: "lower_limbs" },
            { label: "Upper limbs", value: "upper_limbs" },
            { label: "Trunk", value: "trunk" },
          ],
          showIf: { field: "spasm_present", equals: "Yes" },
        },
        {
          type: "input",
          name: "spasm_site_specify",
          label: "Specify",
          showIf: {
            field: "spasm_present",
            equals: "Yes",
            and: {
              or: [
                { field: "spasm_sites", includes: "lower_limbs" },
                { field: "spasm_sites", includes: "upper_limbs" },
                { field: "spasm_sites", includes: "trunk" }
              ]
            }
          }
        },
        {
          type: "assessment-launcher",
          name: "spasm_penn_frequency_assessment",
          label: "PENN Spasm Frequency Scale (PSFS)",
          options: [{ label: "PENN Spasm Frequency Scale (PSFS)", value: "penn_scale" }],
          showIf: { field: "spasm_present", equals: "Yes" },
        },
        {
          type: "input",
          name: "spasm_frequency_score_interpretation",
          label: "Frequency - Score & Interpretation",
          readOnly: true,
          showIf: { field: "spasm_present", equals: "Yes" },
        },
        {
          type: "radio",
          name: "spasm_frequency_severity",
          label: "Severity",
          options: ["Mild", "Moderate", "Severe"],
          showIf: { field: "spasm_present", equals: "Yes" },
        },
        { type: "subheading", label: "Effect", showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_causes_pain", label: "Causes Pain", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_disturb_sleep", label: "Disturb Sleep", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_function", label: "Affect Function", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_ambulation", label: "Ambulation", options: yesNo, showIf: { field: "spasm_affect_function", equals: "Yes" } },
        { type: "input", name: "spasm_affect_ambulation_specify", label: "Ambulation (Specify)", showIf: { field: "spasm_affect_ambulation", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_standing", label: "Standing", options: yesNo, showIf: { field: "spasm_affect_function", equals: "Yes" } },
        { type: "input", name: "spasm_affect_standing_specify", label: "Standing (Specify)", showIf: { field: "spasm_affect_standing", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_transfer", label: "Transfer", options: yesNo, showIf: { field: "spasm_affect_function", equals: "Yes" } },
        { type: "input", name: "spasm_affect_transfer_specify", label: "Transfer (Specify)", showIf: { field: "spasm_affect_transfer", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_adl", label: "ADL", options: yesNo, showIf: { field: "spasm_affect_function", equals: "Yes" } },
        { type: "input", name: "spasm_affect_adl_specify", label: "ADL (Specify)", showIf: { field: "spasm_affect_adl", equals: "Yes" } },
        { type: "radio", name: "spasm_affect_others", label: "Others", options: yesNo, showIf: { field: "spasm_affect_function", equals: "Yes" } },
        { type: "input", name: "spasm_affect_others_specify", label: "Others (Specify)", showIf: { field: "spasm_affect_others", equals: "Yes" } },
        { type: "radio", name: "spasm_oral_agents", label: "Oral", options: yesNo, showIf: { field: "spasm_antispastic_agent", equals: "Yes" } },
        { type: "input", name: "spasm_oral_agents_specify", label: "Oral (Specify)", showIf: { field: "spasm_oral_agents", equals: "Yes" } },
        { type: "radio", name: "spasm_intrathecal_agents", label: "Intrathecal agents", options: yesNo, showIf: { field: "spasm_antispastic_agent", equals: "Yes" } },
        { type: "input", name: "spasm_intrathecal_agents_specify", label: "Intrathecal agents (Specify)", showIf: { field: "spasm_intrathecal_agents", equals: "Yes" } },
        { type: "radio", name: "spasm_botox_injection", label: "Intramuscular botulinum toxin injection", options: yesNo, showIf: { field: "spasm_injection", equals: "Yes" } },
        { type: "textarea", name: "spasm_botox_details", label: "Which year / Site & Goal of injection / Lasting effect", showIf: { field: "spasm_botox_injection", equals: "Yes" } },
        { type: "radio", name: "spasm_neurolysis", label: "Neurolysis", options: yesNo, showIf: { field: "spasm_injection", equals: "Yes" } },
        { type: "input", name: "spasm_neurolysis_specify", label: "Neurolysis (Specify)", showIf: { field: "spasm_neurolysis", equals: "Yes" } },
        { type: "radio", name: "spasm_hand_splint", label: "Antispastic hand splint", options: yesNo, showIf: { field: "spasm_orthosis_use", equals: "Yes" } },
        { type: "radio", name: "spasm_afo_type", label: "Ankle foot orthosis (AFO)", options: ["Solid AFO", "Hinged AFO", "Others"], showIf: { field: "spasm_orthosis_use", equals: "Yes" } },
        { type: "input", name: "spasm_afo_type_other_specify", label: "AFO - Others (Specify)", showIf: { field: "spasm_afo_type", equals: "Others" } },
        { type: "input", name: "spasm_orthopaedic_procedure_specify", label: "Orthopaedic procedure (Specify)", showIf: { field: "spasm_orthopaedic_procedure", equals: "Yes" } },
        {
            type: "subheading",
            label: "Goals",
            showIf: { field: "spasm_present", equals: "Yes" },
          },
          {
            name: "spasm_goals",
            type: "textarea",
            placeholder: "Enter goals",
            showIf: { field: "spasm_present", equals: "Yes" },
        },
        { type: "subheading", label: "Plan", showIf: { field: "spasm_present", equals: "Yes" } },       
        {
          type: "checkbox-group",
          name: "spasm_plan",
          label: "",
          options: [
            { label: "Eliminate noxious stimuli eg infection, constipation, pain and others", value: "eliminate_noxious_stimuli" },
            { label: "Schedule for Intramuscular botulinum toxin type A injection", value: "schedule_botox" },
            { label: "For further evaluation by CPO for orthosis", value: "evaluation_cpo_orthosis" },
          ],
          showIf: { field: "spasm_present", equals: "Yes" },
        },
        { type: "input", name: "spasm_plan_schedule_botox_specify", label: "Schedule for Intramuscular botulinum toxin type A injection (Specify)", showIf: { field: "spasm_plan", includes: "schedule_botox" } },
        { type: "subheading", label: "Treatment", showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_antispastic_agent", label: "Antispastic agent", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_injection", label: "Injection", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_physical_therapy", label: "Physical therapy (stretching, casting, physical modality)", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_orthosis_use", label: "Use of orthosis", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
        { type: "radio", name: "spasm_orthopaedic_procedure", label: "Orthopaedic procedure", options: yesNo, showIf: { field: "spasm_present", equals: "Yes" } },
      ],
    },
  ],
};

export default function SpasmSpasticity() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    const updated = { ...values, [name]: value };
    if (name === "spasm_penn_frequency_interpretation") {
      updated.spasm_frequency_score_interpretation = value;
    }
    if (name.startsWith("spasticity_muscle_tone_upper_table_") || name.startsWith("spasticity_muscle_tone_lower_table_")) {
      const m = name.match(/^spasticity_muscle_tone_(upper|lower)_table_(.+)_(\d)$/);
      if (m) {
        const tablePrefix = `spasticity_muscle_tone_${m[1]}_table`;
        const row = m[2];
        const rightR2 = Number(updated[`${tablePrefix}_${row}_2`]);
        const leftR2 = Number(updated[`${tablePrefix}_${row}_3`]);
        const rightR1 = Number(updated[`${tablePrefix}_${row}_4`]);
        const leftR1 = Number(updated[`${tablePrefix}_${row}_5`]);

        const hasRight = String(updated[`${tablePrefix}_${row}_2`] ?? "").trim() !== "" &&
          String(updated[`${tablePrefix}_${row}_4`] ?? "").trim() !== "";
        const hasLeft = String(updated[`${tablePrefix}_${row}_3`] ?? "").trim() !== "" &&
          String(updated[`${tablePrefix}_${row}_5`] ?? "").trim() !== "";

        updated[`${tablePrefix}_${row}_6`] = hasRight ? String(rightR2 - rightR1) : "";
        updated[`${tablePrefix}_${row}_7`] = hasLeft ? String(leftR2 - leftR1) : "";
      }
    }
    setValues(updated);
  };

  return (
    <CommonFormBuilder
      schema={SPASM_SPASTICITY_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      assessmentRegistry={SPASM_SPASTICITY_REGISTRY}
    />
  );
}
