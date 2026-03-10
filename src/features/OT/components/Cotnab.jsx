import { useState } from "react";
import { COTNAB_Schema } from "../schema/COTNAB_schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"


export default function COTNABAssessment() {
    const [values, setValues] = useState({})

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: {
              ...prev[name],
              [value]: !prev?.[name]?.[value]
            }
        }))
    }

    return (
        <CommonFormBuilder
            schema={COTNAB_Schema}
            values={values}
            onChange={handleChange}
            layout="nested"
        />
    )
}
