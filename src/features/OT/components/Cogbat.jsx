import { useState } from "react";
import { COGBAT_SCHEMA } from "../schema/COGBAT_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function COGBATAssessment() {
    const [values, setValues] = useState({})

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <CommonFormBuilder 
            schema={COGBAT_SCHEMA}
            values={values}
            onChange={handleChange}
            layout="nested"
        />
    )
}