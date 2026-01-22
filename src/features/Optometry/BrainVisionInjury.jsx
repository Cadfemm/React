import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function BrainVisionInjury ({ onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
 const scaleColumns = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "Always", value: 4 }
];

const schema = {
  title: "Brain Injury Vision Symptoms Survey (BIVSS)",
  sections: [
    {
      title: "VISION CLARITY",
      fields: [
        {
          type: "scale-table",
          name: "vision_clarity",
          columns: scaleColumns,
          rows: [
            "Distance vision is blurred and unclear even with glasses",
            "Near vision is blurred and unclear even with glasses",
            "Vision clarity changes throughout the day",
            "Night vision is unclear / unable to see well in low light"
          ]
        }
      ]
    },

    {
      title: "VISUAL COMFORT",
      fields: [
        {
          type: "scale-table",
          name: "visual_comfort",
          columns: scaleColumns,
          rows: [
            "Eyes feel uncomfortable / painful / tired",
            "Headache or dizziness after using the eyes",
            "Eye pain or soreness after using the eyes all day",
            "Tight feeling around the eyes"
          ]
        }
      ]
    },

    {
      title: "DOUBLE VISION",
      fields: [
        {
          type: "scale-table",
          name: "double_vision",
          columns: scaleColumns,
          rows: [
            "Double vision, especially when the eyes feel tired",
            "Need to close one eye to see clearly",
            "Words appear to move when reading"
          ]
        }
      ]
    },

    {
      title: "LIGHT SENSITIVITY",
      fields: [
        {
          type: "scale-table",
          name: "light_sensitivity",
          columns: scaleColumns,
          rows: [
            "Discomfort (glare) with indoor lighting",
            "Need to wear dark glasses when outdoors",
            "Indoor lighting interferes with vision"
          ]
        }
      ]
    },

    {
      title: "DRY EYES",
      fields: [
        {
          type: "scale-table",
          name: "dry_eyes",
          columns: scaleColumns,
          rows: [
            "Eyes feel dry and painful",
            "Often feel the urge to blink",
            "Frequently rub the eyes"
          ]
        }
      ]
    },

    {
      title: "DEPTH PERCEPTION",
      fields: [
        {
          type: "scale-table",
          name: "depth_perception",
          columns: scaleColumns,
          rows: [
            "Difficulty judging position of objects",
            "Uncertain when walking / easily trip or stumble",
            "Handwriting becomes messy"
          ]
        }
      ]
    },

    {
      title: "PERIPHERAL VISION",
      fields: [
        {
          type: "scale-table",
          name: "peripheral_vision",
          columns: scaleColumns,
          rows: [
            "Side vision appears blurred or objects seem to move",
            "Objects in front are not always directly in front"
          ]
        }
      ]
    },

    {
      title: "READING",
      fields: [
        {
          type: "scale-table",
          name: "reading",
          columns: scaleColumns,
          rows: [
            "Poor concentration / easily distracted while reading",
            "Difficulty or slowness when reading and writing",
            "Poor comprehension / cannot remember what was read",
            "Lose place or skip words while reading",
            "Need to use finger to keep place while reading"
          ]
        }
      ]
    }
  ]
};


  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("PAED IA Speech & Language", values);
    }

    if (type === "back") {
      onBack?.();   
    }
  };


  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
        layout={layout}
    />
  );
}
