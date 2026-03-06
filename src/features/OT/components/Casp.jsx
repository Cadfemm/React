import { useState } from "react";
import { CASP_SCHEMA } from "../schema/CASP_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function CASPAssessment() {
    const [values, setValues] = useState({})

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const totalScore = () => {
        var sum = 0
        Object.entries(values).forEach(([keys, value]) => {
            if (Number.isInteger(value)) {
                sum += value
            }
        })
        return sum
    }

    const computedValues = {
        ...values,
        total_casp_score: totalScore()
    }
    return (
        <CommonFormBuilder
            schema={CASP_SCHEMA}
            values={computedValues}
            onChange={handleChange}
            layout="nested"
        />
    )
}