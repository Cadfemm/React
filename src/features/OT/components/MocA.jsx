import { useState } from "react";
import { MoCA_Schema } from "../schema/MOCA_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"

export default function MoCAAssessment() {
    const [values, setValues] = useState({})

    const handleChange = (name, value) => {
        setValues(prev =>  ({
            ...prev,
            [name]: value
        }))
    }

    const totalScore = () => {
        var sum = 0
        Object.entries(values).forEach(([key, value]) => {
            if (key !== "mis_score") {
                sum += value
            }
        })
        return sum
    }

    const computedValues = {
        ...values,
        total_moca_score: totalScore()
    }
    return (
        <CommonFormBuilder
            schema={MoCA_Schema}
            values={computedValues}
            onChange={handleChange}
            layout="nested"
        />
    )
}