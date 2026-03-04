import { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import {LOW_VISION_ASSESSMENT_SCHEMA} from "./schema/lowVisionAssessmentSchema"

export default function LowVisionAssessment({ onBack, layout="root"}) {
    const [values, setValues] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const onChange = (name, value)=> {
        setValues(v=>({...v, [name]: value}))
    }

    const handleAction = (type) => {
        if (type === "submit"){
            setSubmitted(true)
            console.log("PAED IA Speech & Language", values)
        } else if ( type === "back") {
            onBack?.()
        }
    }
    
    return (
    <CommonFormBuilder
        schema={LOW_VISION_ASSESSMENT_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout={layout}
    />
    );
}