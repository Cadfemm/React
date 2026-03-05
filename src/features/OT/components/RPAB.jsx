import { useState } from "react";
import { RPAB_Schema } from "../schema/RPAB_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function RPAB_Assessment () {
    const [values, setValues] = useState({})

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const totalScore = () => {
        var sum = 0
        Object.entries(values).forEach(([key, value]) => {
            value = parseInt(value)
            if (Number.isInteger(value)) {
                if (["sequencing_picture", "figure_ground_discrimination"].includes(key) && value > 2){
                    sum += 2
                } else if (key === "body_image" && value > 10){
                    sum += 10
                } else if (key === "copying_shapes_rl" && value > 65) {
                    sum += 65
                } else if (key === "copying_words_rl" && value > 30) {
                    sum += 30
                } else if (key === "cancellation_inattention" && value > 48) {
                    sum += 48
                } else if (key === "spatial_3d_copying" && value > 18) {
                    sum += 18
                } else if (key === "spatial_cube_copying" && value > 54) {
                    sum += 54
                } else {
                    sum += value
                }
            }
        })
        return sum
    }

    const computedValues = {
        ...values,
        total_rpab_score: totalScore()
    }

    return (
        <CommonFormBuilder 
            schema={RPAB_Schema}
            values={computedValues}
            onChange={handleChange}
            layout="nested"
        />
    )
}