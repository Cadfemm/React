import React, { useState, useEffect, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BradenScaleForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_braden_scale_draft_${patient.id}`
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
        alert("Braden Scale draft saved successfully");
        break;
      default:
        break;
    }
  };

  // Calculate total score
  const totalScore = useMemo(() => {
    let score = 0;
    
    // Sensory perception: 1-4 points
    if (values.sensory_perception) {
      const points = parseInt(values.sensory_perception);
      if (!isNaN(points)) score += points;
    }
    
    // Moisture: 1-4 points
    if (values.moisture) {
      const points = parseInt(values.moisture);
      if (!isNaN(points)) score += points;
    }
    
    // Activity: 1-4 points
    if (values.activity) {
      const points = parseInt(values.activity);
      if (!isNaN(points)) score += points;
    }
    
    // Mobility: 1-4 points
    if (values.mobility) {
      const points = parseInt(values.mobility);
      if (!isNaN(points)) score += points;
    }
    
    // Nutrition: 1-4 points
    if (values.nutrition) {
      const points = parseInt(values.nutrition);
      if (!isNaN(points)) score += points;
    }
    
    // Friction and shear: 1-3 points
    if (values.friction_shear) {
      const points = parseInt(values.friction_shear);
      if (!isNaN(points)) score += points;
    }
    
    return score;
  }, [values]);

  // Determine risk level
  const riskLevel = useMemo(() => {
    if (totalScore >= 20 && totalScore <= 23) return "Low (23 - 20 points)";
    if (totalScore >= 16 && totalScore <= 19) return "Medium (19 - 16 points)";
    if (totalScore >= 11 && totalScore <= 15) return "High (15 - 11 points)";
    if (totalScore >= 6 && totalScore <= 10) return "Very High (10 - 6 points)";
    return "-";
  }, [totalScore]);

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "Braden Scale",
      values: {
        ...values,
        totalScore,
        riskLevel
      },
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("Braden Scale submitted successfully");
    onSubmit?.(payload);
  };

  const BRADEN_SCALE_SCHEMA = {
    title: "Braden-Scale",
    sections: [
      {
        fields: [
          {
            name: "sensory_perception",
            label: "1. Sensory perception",
            type: "radio-matrix",
            info: {
              title: "Ability respond meaningfully to pressure-related discomfort",
              content: [
                "1 point - Completely limited: Unresponsive (does not moan, flinch or grasp) to painful stimuli, due to diminished level of consciousness or sedation OR Limited ability to feel pain over most of body surface",
                "2 points - Very limited: Responds only to painful stimuli. Cannot communicate discomfort except by moaning or restlessness OR Has a sensory impairment which limits the ability to feel pain or discomfort over ½ of body",
                "3 points - Slightly limited: Responds to verbal commands but cannot always communicate discomfort or need to be turned OR Has some sensory impairment which limits ability to feel pain or discomfort in 1 or 2 extremities",
                "4 points - No impairment: Responds to verbal commands OR Has no sensory deficit which would limit ability to feel or voice pain or discomfort"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              },
              {
                label: "4",
                value: "4"
              }
            ]
          },
          {
            name: "moisture",
            label: "2. Moisture",
            type: "radio-matrix",
            info: {
              title: "Degree to which skin is exposed to moisture",
              content: [
                "1 point - Constantly moist: Skin is kept moist almost constantly by perspiration, urine, etc. Dampness is detected every time patient is moved or turned",
                "2 points - Moist: Skin is often but not always moist. Linen must be changed at least once a shift",
                "3 points - Occasionally moist: Skin is occasionally moist, requiring an extra linen change approximately once a day",
                "4 points - Rarely moist: Skin is usually dry; Linen requires changing only at routine intervals"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              },
              {
                label: "4",
                value: "4"
              }
            ]
          },
          {
            name: "activity",
            label: "3. Activity",
            type: "radio-matrix",
            info: {
              title: "Degree of physical activity",
              content: [
                "1 point - Bedfast: Confined to bed",
                "2 points - Chairfast: Ability to walk severely limited or non-existent. Cannot bear own weight and/or must be assisted into chair or wheel chair",
                "3 points - Walks occasionally: Walks occasionally during day but for very short distances, with or without assistance. Spends majority of each shift in bed or chair",
                "4 points - Walks frequently: Walks outside the room at least twice a day and inside room at least once every 2 hours during waking hours"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              },
              {
                label: "4",
                value: "4"
              }
            ]
          },
          {
            name: "mobility",
            label: "4. Mobility",
            type: "radio-matrix",
            info: {
              title: "Ability to change and control body position",
              content: [
                "1 point - Completely immobile: Does not make even slight changes in body or extremity position without assistance",
                "2 points - Very limited: Makes occasional slight changes in body or extremity position. Unable to make frequent or significant changes independently",
                "3 points - Slightly limited: Makes frequent though slight changes in body or extremity position independently",
                "4 points - No limitations: Makes major and frequent changes in position without assistance"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              },
              {
                label: "4",
                value: "4"
              }
            ]
          },
          {
            name: "nutrition",
            label: "5. Nutrition",
            type: "radio-matrix",
            info: {
              title: "Usual food intake pattern",
              content: [
                "1 point - Very poor: Never eats a complete meal. Rarely eats more than 1/3 of any food offered. Eats 2 servings or less of protein (meat or dairy products) per day. Takes fluids poorly. Does not take a liquid dietary supplement OR Is NPO AND/OR Maintained on clear liquids OR IV For more than 5 days",
                "2 points - Probably inadequate: Rarely eats a complete meal and generally eats only about ½ of any food offered. Protein intake includes only 3 servings of meat or dairy products per day. Occasionally will take a dietary supplement OR Receives less than optimum amount of liquid diet or tube feeding",
                "3 points - Adequate: Eats over half of most meals. Eats a total of 4 servings of protein (meat, dairy products) each day. Occasionally will refuse a meal, but will usually take a supplement if offered OR Is on a tube feeding or TPN regimen, which probably meets most of nutritional need",
                "4 points - Excellent: Eats most of every meal, never refuses a meal. Usually eats a total of 4 or more servings of meat and dairy products. Occasionally eats between meals. Does not require supplementation"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              },
              {
                label: "4",
                value: "4"
              }
            ]
          },
          {
            name: "friction_shear",
            label: "6. Friction and shear",
            type: "radio",
            info: {
              title: "Friction and shear",
              content: [
                "1 point - Problem: Requires moderate to maximum assistance in moving. Complete lifting without sliding against sheets is impossible. Frequently slides down in bed or chair, requiring frequent repositioning with maximum assistance. Spasticity, contractures OR Agitation leads to almost constant friction",
                "2 points - Potential problem: Moves feebly or requires minimum assistance. During a move skin probably slides to some extent against sheets, chair, restraints, or other devices. Maintains relatively good position in chair or bed most of the time. Occasionally slides down",
                "3 points - No apparent problem: Moves in bed and in chair independently. Has sufficient muscle strength to lift up completely during move. Maintains good position in bed or chair at all times"
              ]
            },
            options: [
              {
                label: "1",
                value: "1"
              },
              {
                label: "2",
                value: "2"
              },
              {
                label: "3",
                value: "3"
              }
            ]
          },
          {
            type: "subheading",
            label: "Risk for pressure ulcers acc. to Braden-Scale:"
          },
          {
            name: "total_score_display",
            label: "Total score",
            type: "score-box"
          },
          {
            name: "risk_level_display",
            label: "Risk Level",
            type: "score-box"
          }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={BRADEN_SCALE_SCHEMA}
        values={{
          ...values,
          total_score_display: totalScore.toString(),
          risk_level_display: riskLevel
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
