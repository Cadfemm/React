import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const STRENGTH_SCHEMA = {
    title: "Strength Test",
    sections: [
        {
            fields: [
                {
                    type: "grid-header",
                    label: "Grip Strength",
                    cols: ["Right (kgF)", "Left (kgF)"]
                },
                {
                    type: "grid-row",
                    name: "grip_strength_trial_one",
                    label: "1st Trial",
                    cols: [
                        {type: "input-number-range", name: "grip_strength_trial_one_right"}, 
                        {type: "input-number-range", name: "grip_strength_trial_one_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "grip_strength_trial_second",
                    label: "2nd Trial",
                    cols: [
                        {type: "input-number-range", name: "grip_strength_trial_second_right"}, 
                        {type: "input-number-range", name: "grip_strength_trial_second_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "grip_strength_trial_third",
                    label: "3rd Trial",
                    cols: [
                        {type: "input-number-range", name: "grip_strength_trial_third_right"}, 
                        {type: "input-number-range", name: "grip_strength_trial_third_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "grip_strength_average",
                    label: "Total (average) kgF",
                    cols: [
                        {type: "input-number-range",  readOnly: "true", name: "grip_strength_average_right"}, 
                        {type: "input-number-range",  readOnly: "true", name: "grip_strength_average_left"},
                    ]
                },
                {
                    type: "grid-header",
                    label: "Lateral Pinch",
                    cols: ["Right (kgF)", "Left (kgF)"]
                },
                {
                    type: "grid-row",
                    name: "lateral_pinch_trial_one",
                    label: "1st Trial",
                    cols: [
                        {type: "input-number-range", name: "lateral_pinch_trial_one_right"}, 
                        {type: "input-number-range", name: "lateral_pinch_trial_one_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "lateral_pinch_trial_second",
                    label: "2nd Trial",
                    cols: [
                        {type: "input-number-range", name: "lateral_pinch_trial_second_right"}, 
                        {type: "input-number-range", name: "lateral_pinch_trial_second_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "lateral_pinch_trial_third",
                    label: "3rd Trial",
                    cols: [
                        {type: "input-number-range", name: "lateral_pinch_trial_third_right"}, 
                        {type: "input-number-range", name: "lateral_pinch_trial_third_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "lateral_pinch_average",
                    label: "Total (average) kgF",
                    cols: [
                        {type: "input-number-range",  readOnly: "true", name: "lateral_pinch_average_right"}, 
                        {type: "input-number-range",  readOnly: "true", name: "lateral_pinch_average_left"},
                    ]
                },
                {
                    type: "grid-header",
                    label: "Tip Pinch",
                    cols: ["Right (kgF)", "Left (kgF)"]
                },
                {
                    type: "grid-row",
                    name: "tip_pinch_trial_one",
                    label: "1st Trial",
                    cols: [
                        {type: "input-number-range", name: "tip_pinch_trial_one_right"}, 
                        {type: "input-number-range", name: "tip_pinch_trial_one_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tip_pinch_trial_second",
                    label: "2nd Trial",
                    cols: [
                        {type: "input-number-range", name: "tip_pinch_trial_second_right"}, 
                        {type: "input-number-range", name: "tip_pinch_trial_second_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tip_pinch_trial_third",
                    label: "3rd Trial",
                    cols: [
                        {type: "input-number-range", name: "tip_pinch_trial_third_right"}, 
                        {type: "input-number-range", name: "tip_pinch_trial_third_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tip_pinch_average",
                    label: "Total (average) kgF",
                    cols: [
                        {type: "input-number-range",  readOnly: "true", name: "tip_pinch_average_right"}, 
                        {type: "input-number-range",  readOnly: "true", name: "tip_pinch_average_left"},
                    ]
                },
                {
                    type: "grid-header",
                    label: "Tripod Pinch",
                    cols: ["Right (kgF)", "Left (kgF)"]
                },
                {
                    type: "grid-row",
                    name: "tripod_pinch_trial_one",
                    label: "1st Trial",
                    cols: [
                        {type: "input-number-range", name: "tripod_pinch_trial_one_right"}, 
                        {type: "input-number-range", name: "tripod_pinch_trial_one_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tripod_pinch_trial_second",
                    label: "2nd Trial",
                    cols: [
                        {type: "input-number-range", name: "tripod_pinch_trial_second_right"}, 
                        {type: "input-number-range", name: "tripod_pinch_trial_second_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tripod_pinch_trial_third",
                    label: "3rd Trial",
                    cols: [
                        {type: "input-number-range", name: "tripod_pinch_trial_third_right"}, 
                        {type: "input-number-range", name: "tripod_pinch_trial_third_left"},
                    ]
                },
                {
                    type: "grid-row",
                    name: "tripod_pinch_average",
                    label: "Total (average) kgF",
                    cols: [
                        {type: "input-number-range",  readOnly: "true", name: "tripod_pinch_average_right"}, 
                        {type: "input-number-range",  readOnly: "true", name: "tripod_pinch_average_left"},
                    ]
                },
            ]
        }
    ]
}

export default function StrengthTestForm({values, onChange}) {
    const computedValues = {
        ...values,
        grip_strength_average_right: (
            parseInt(values.grip_strength_trial_one_right) +
            parseInt(values.grip_strength_trial_second_right) + 
            parseInt(values.grip_strength_trial_third_right)) / 3,
        grip_strength_average_left: (
            parseInt(values.grip_strength_trial_one_left) +
            parseInt(values.grip_strength_trial_second_left) + 
            parseInt(values.grip_strength_trial_third_left)) / 3,
        lateral_pinch_average_right: (
            parseInt(values.lateral_pinch_trial_one_right) +
            parseInt(values.lateral_pinch_trial_second_right) + 
            parseInt(values.lateral_pinch_trial_third_right)) / 3,
        lateral_pinch_average_left: (
            parseInt(values.lateral_pinch_trial_one_left) +
            parseInt(values.lateral_pinch_trial_second_left) + 
            parseInt(values.lateral_pinch_trial_third_left)) / 3,
        tip_pinch_average_right: (
            parseInt(values.tip_pinch_trial_one_right) +
            parseInt(values.tip_pinch_trial_second_right) + 
            parseInt(values.tip_pinch_trial_third_right)) / 3,
        tip_pinch_average_left: (
            parseInt(values.tip_pinch_trial_one_left) +
            parseInt(values.tip_pinch_trial_second_left) + 
            parseInt(values.tip_pinch_trial_third_left)) / 3,

        tripod_pinch_average_right: (
            parseInt(values.tripod_pinch_trial_one_right) +
            parseInt(values.tripod_pinch_trial_second_right) + 
            parseInt(values.tripod_pinch_trial_third_right)) / 3,

        tripod_pinch_average_left: (
            parseInt(values.tripod_pinch_trial_one_left) +
            parseInt(values.tripod_pinch_trial_second_left) + 
            parseInt(values.tripod_pinch_trial_third_left)) / 3
    }

    return (
        <CommonFormBuilder
            schema={STRENGTH_SCHEMA}
            values={computedValues}
            onChange={onChange}
            layout="nested"
        />
    )
}