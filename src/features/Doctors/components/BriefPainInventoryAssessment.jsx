import { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BriefPainInventoryAssessment({ values, onChange }) {
  const schema = useMemo(() => {
    return {
      title: "Brief Pain Inventory (Short Form)",
      sections: [
        {
          title: "Pain Location & History",
          fields: [
            {
              name: "bpi_pain_history",
              label: "Throughout our lives, most of us have had pain from time to time (such as minor headaches, sprains, and toothaches). Have you had pain other than these everyday kinds of pain today?",
              type: "radio",
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "bpi_pain_location",
              label: "On the diagram, shade in the areas where you feel pain. Put an X on the area that hurts the most.",
              type: "textarea",
              placeholder: "Describe pain location"
            }
          ]
        },
        {
          title: "Pain Severity (0 = No Pain, 10 = Pain as bad as you can imagine)",
          fields: [
            {
              name: "bpi_pain_worst",
              label: "Please rate your pain by circling the one number that best describes your pain at its WORST in the past 24 hours.",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_pain_least",
              label: "Please rate your pain by circling the one number that best describes your pain at its LEAST in the past 24 hours.",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_pain_average",
              label: "Please rate your pain by circling the one number that best describes your pain on the AVERAGE.",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_pain_now",
              label: "Please rate your pain by circling the one number that best describes your pain RIGHT NOW.",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            }
          ]
        },
        {
          title: "Pain Relief & Treatments",
          fields: [
            {
              name: "bpi_treatments",
              label: "What treatments or medications are you receiving for your pain?",
              type: "textarea",
              placeholder: "List treatments or medications"
            },
            {
              name: "bpi_relief_percentage",
              label: "In the past 24 hours, how much RELIEF have pain treatments or medications provided? Please circle the one percentage that most shows how much relief you have received.",
              type: "scale-slider",
              min: 0,
              max: 100,
              step: 10,
              showValue: true
            }
          ]
        },
        {
          title: "Pain Interference with Activities (0 = Does not interfere, 10 = Completely interferes)",
          fields: [
            {
              name: "bpi_general_activity",
              label: "A. General Activity",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_mood",
              label: "B. Mood",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_walking_ability",
              label: "C. Walking Ability",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_normal_work",
              label: "D. Normal work (includes both work outside the home and housework)",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_relations_people",
              label: "E. Relation with other people",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_sleep",
              label: "F. Sleep",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            },
            {
              name: "bpi_enjoyment_life",
              label: "G. Enjoyment of life",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true
            }
          ]
        }
      ]
    };
  }, []);

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
