import { useState } from "react";
import { DCOG_Schema } from "../schema/DCOG_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function DCOGAssessment() {
    const [values, setValues] = useState({})

    const handleChange = (name, value)=> {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const totalScore = () => {
        var sum = 0
        Object.entries(values).forEach(([keys, value])=> {
            sum += value
        })
        return sum
    }

    const computedValues = {
        ...values,
        total_dcog_score: totalScore()
    }

    return (
        <CommonFormBuilder 
            schema={DCOG_Schema}
            values={values}
            onChange={handleChange}
            layout="nested"
        />
    )
}