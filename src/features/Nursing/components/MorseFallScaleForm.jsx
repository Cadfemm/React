import React, { useState, useEffect, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function MorseFallScaleForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_morse_fall_scale_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;
      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        break;
      case "save":
        if (!storageKey) return;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ values, updatedAt: new Date().toISOString() })
        );
        alert("Morse Fall Scale draft saved successfully");
        break;
      default:
        break;
    }
  };

  // Calculate total score
  const totalScore = useMemo(() => {
    let score = 0;
    
    // History of falling: No = 0, Yes = 25
    if (values.history_of_falling === "yes") score += 25;
    
    // Secondary diagnosis: No = 0, Yes = 15
    if (values.secondary_diagnosis === "yes") score += 15;
    
    // Ambulatory aid: Bed rest/nurse assist = 0, Crutches/cane/walker = 15, Furniture = 30
    if (values.ambulatory_aid === "crutches_cane_walker") score += 15;
    if (values.ambulatory_aid === "furniture") score += 30;
    
    // IV/Heparin Lock: No = 0, Yes = 20
    if (values.iv_heparin_lock === "yes") score += 20;
    
    // Gait/Transferring: Normal/bedrest/immobile = 0, Weak = 10, Impaired = 20
    if (values.gait_transferring === "weak") score += 10;
    if (values.gait_transferring === "impaired") score += 20;
    
    // Mental status: Oriented to own ability = 0, Forgets limitations = 15
    if (values.mental_status === "forgets_limitations") score += 15;
    
    return score;
  }, [values]);

  // Determine risk level
  const riskLevel = useMemo(() => {
    if (totalScore === 0) return { level: "No Risk", action: "Good Basic Nursing Care" };
    if (totalScore >= 1 && totalScore <= 24) return { level: "Low Risk", action: "Good Basic Nursing Care" };
    if (totalScore >= 25 && totalScore <= 50) return { level: "Medium Risk", action: "Implement Standard Fall Prevention Interventions" };
    return { level: "High Risk", action: "Implement High Risk Fall Prevention Interventions" };
  }, [totalScore]);

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "Morse Fall Scale",
      values: {
        ...values,
        totalScore,
        riskLevel: riskLevel.level,
        recommendedAction: riskLevel.action
      },
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("Morse Fall Scale submitted successfully");
    onSubmit?.(payload);
  };

  const MORSE_FALL_SCALE_SCHEMA = {
    title: "Morse Fall Scale",
    sections: [
      {
        fields: [
          {
            name: "history_of_falling",
            label: "1. History of falling; immediate or within 3 months",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "secondary_diagnosis",
            label: "2. Secondary diagnosis",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "ambulatory_aid",
            label: "3. Ambulatory aid",
            type: "radio",
            options: [
              { label: "Bed rest/nurse assist", value: "bed_rest_nurse_assist" },
              { label: "Crutches/cane/walker", value: "crutches_cane_walker" },
              { label: "Furniture", value: "furniture" }
            ]
          },
          {
            name: "iv_heparin_lock",
            label: "4. IV/Heparin Lock",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gait_transferring",
            label: "5. Gait/Transferring",
            type: "radio",
            options: [
              { label: "Normal/bedrest/immobile", value: "normal_bedrest_immobile" },
              { label: "Weak", value: "weak" },
              { label: "Impaired", value: "impaired" }
            ]
          },
          {
            name: "mental_status",
            label: "6. Mental status",
            type: "radio",
            options: [
              { label: "Oriented to own ability", value: "oriented" },
              { label: "Forgets limitations", value: "forgets_limitations" }
            ]
          },
          {
            type: "subheading",
            label: "Score Summary"
          },
          {
            name: "total_score_display",
            label: "Total MFS Score",
            type: "score-box"
          },
          {
            name: "risk_level_display",
            label: "Risk Level",
            type: "score-box"
          },
          {
            name: "recommended_action_display",
            label: "Recommended Action",
            type: "score-box"
          }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={MORSE_FALL_SCALE_SCHEMA}
        values={{
          ...values,
          total_score_display: totalScore.toString(),
          risk_level_display: riskLevel.level,
          recommended_action_display: riskLevel.action
        }}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            style={{
              padding: "12px 34px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
