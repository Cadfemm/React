import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
function calculateFIM(values) {

    const sumTable = (prefix, rows) => {
        let total = 0;

        for (let i = 0; i < rows; i++) {
            const key = `${prefix}_${i}`;
            total += Number(values[key] || 0);
        }

        return total;
    };

    const motor =
        sumTable("selfcare", 6) +
        sumTable("sphincter", 2) +
        sumTable("transfer", 3) +
        sumTable("locomotion", 2);

    const cognitive =
        sumTable("communication", 2) +
        sumTable("social", 3);

    return {
        motor,
        cognitive,
        total: motor + cognitive
    };
}
export default function FIMAssessment() {

    const [values, setValues] = useState({});
    const FIM_SCALE_INFO = {
        title: "FIM Score Meaning",
        content: [
            "7 – Complete Independence: Patient performs task safely.",
            "6 – Modified Independence: Uses device (walker, cane).",
            "5 – Supervision: Only supervision required.",
            "4 – Minimal Assistance: Patient performs 75% of task.",
            "3 – Moderate Assistance: Patient performs 50%.",
            "2 – Maximal Assistance: Patient performs 25%.",
            "1 – Total Assistance: Patient performs <25%."
        ]
    };
    const FIM_SCALE_COLUMNS = [
        { label: "1", value: "1", required: true },
        { label: "2", value: "2", required: true },
        { label: "3", value: "3", required: true },
        { label: "4", value: "4", required: true },
        { label: "5", value: "5", required: true },
        { label: "6", value: "6", required: true },
        { label: "7", value: "7", required: true },
    ];
    const FIM_SCHEMA = {
        title: "FIM Assessment",
  titleInfo: {
    title: "FIM Instrument",
    content: [
      "7 – Complete Independence: Patient performs task safely.",
      "6 – Modified Independence: Uses assistive device.",
      "5 – Supervision: Only supervision needed.",
      "4 – Minimal Assistance: Patient performs 75% of task.",
      "3 – Moderate Assistance: Patient performs 50%.",
      "2 – Maximal Assistance: Patient performs 25%.",
      "1 – Total Assistance: Patient performs <25%."
    ]
  },
        sections: [

            {
                title: "Self Care",
                fields: [
                    {
                        type: "scale-table",
                        name: "selfcare",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Eating",
                            "Grooming",
                            "Bathing",
                            "Dressing - Upper Body",
                            "Dressing - Lower Body",
                            "Toileting"
                        ]
                    }
                ]
            },

            {
                title: "Sphincter Control",
                fields: [
                    {
                        type: "scale-table",
                        name: "sphincter",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Bladder Management",
                            "Bowel Management"
                        ]
                    }
                ]
            },

            {
                title: "Transfers",
                fields: [
                    {
                        type: "scale-table",
                        name: "transfer",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Bed / Chair / Wheelchair",
                            "Toilet",
                            "Tub / Shower"
                        ]
                    }
                ]
            },

            {
                title: "Locomotion",
                fields: [
                    {
                        type: "scale-table",
                        name: "locomotion",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Walk / Wheelchair",
                            "Stairs"
                        ]
                    }
                ]
            },

            {
                title: "Communication",
                fields: [
                    {
                        type: "scale-table",
                        name: "communication",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Comprehension",
                            "Expression"
                        ]
                    }
                ]
            },

            {
                title: "Social Cognition",
                fields: [
                    {
                        type: "scale-table",
                        name: "social",
                        columns: FIM_SCALE_COLUMNS,
                        rows: [
                            "Social Interaction",
                            "Problem Solving",
                            "Memory"
                        ]
                    }
                ]
            },

            {
                title: "Scores",
                fields: [
                    {
                        type: "score-box",
                        name: "motor_score",
                        label: "Motor Subtotal"
                    },
                    {
                        type: "score-box",
                        name: "cognitive_score",
                        label: "Cognitive Subtotal"
                    },
                    {
                        type: "score-box",
                        name: "total_score",
                        label: "Total FIM Score"
                    }
                ]
            }

        ]
    };

    const handleChange = (name, value) => {

        setValues(prev => ({
            ...prev,
            [name]: String(value)   // normalize everything to string
        }));

    };
    useEffect(() => {

        const scores = calculateFIM(values);

        setValues(prev => {
            if (
                prev.motor_score === scores.motor &&
                prev.cognitive_score === scores.cognitive &&
                prev.total_score === scores.total
            ) {
                return prev;
            }

            return {
                ...prev,
                motor_score: scores.motor,
                cognitive_score: scores.cognitive,
                total_score: scores.total
            };
        });

    }, [values]);

    return (
        <CommonFormBuilder
            schema={FIM_SCHEMA}
            values={values}
            onChange={handleChange}
            showScores={true}
            layout="nested"
        />
    );
}