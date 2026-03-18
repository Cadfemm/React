import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function CUEQAssessment() {

    const [values, setValues] = useState({});

    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: Number(value) }));
    };
    const DIFFICULTY_OPTIONS = [
        { label: "No difficulty", value: 4 },
        { label: "A little difficulty", value: 3 },
        { label: "Moderate difficulty", value: 2 },
        { label: "A great deal of difficulty", value: 1 },
        { label: "Unable to do this activity", value: 0 }
    ];


    const CUEQ_SCHEMA = {
        title: "Capabilities of Upper Extremity Questionnaire (CUE-Q)",

        sections: [
            {
                fields: [

                    {
                        type: "scale-table",
                        name: "cueq",


                        columns: DIFFICULTY_OPTIONS,
                        rows: [
                            "Touch something directly in front of you at waist level",
                            "Raise arm directly over head with arm straight",
                            "Reach down to touch the floor and sit back up",
                            "Raise arm directly over head with arm straight",
                            "Reach down to touch the floor and sit back up",
                            "Raise a 5-pound object over your head",
                            "Pull or slide a light object toward you",
                            "Pull or slide a heavy object",
                            "Push a light object away",
                            "Push down with both arms to lift body",
                            "Curl wrist upward while resting arm on lap",
                            "Turn palm down while arm is out",
                            "Grasp and hold an object like a hammer",
                            "Pick up a small object like a paper clip",
                            "Pinch object between thumb and index finger",
                            "Grasp large object like jar lid",
                            "Use fingers to manipulate coins",
                            "Use ring and little finger for tasks"

                          
                        ],


                    }

                ]
            }
        ]
    };
    const totalScore = useMemo(() => {
        return Object.values(values)
            .filter(v => typeof v === "number")
            .reduce((sum, v) => sum + v, 0);
    }, [values]);

    return (
        <div>

            <CommonFormBuilder
                schema={CUEQ_SCHEMA}
                values={values}
                onChange={onChange}
                layout="nested"
            />

            <div
                style={{
                    marginTop: 20,
                    padding: 16,
                    background: "#f1f5f9",
                    borderRadius: 8,
                    fontWeight: 600
                }}
            >
                TOTAL SCORE : {totalScore}
            </div>

        </div>
    );
}