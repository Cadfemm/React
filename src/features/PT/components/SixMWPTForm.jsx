import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SIXMWPT_SCHEMA = {
    title: "6 Minutes Wheelchair Pust Test",
    sections: [
        {
            fields: [
                {
                    name: "distances",
                    label: "Distances",
                    type: "textarea"
                },
                {
                    name: "pre_borg",
                    label: "Pre-BORG",
                    type: "scale-slider",
                    min: 0,
                    max: 10
                },
                {
                    name: "post_borg",
                    label: "Post-BORG",
                    type: "scale-slider",
                    min: 0,
                    max: 10
                },
                {
                    name: "fitness_level",
                    label: "Level of Fitness",
                    type: "radio",
                    options: [
                        { label: "Low Fitness", value: "low_fitness" },
                        { label: "High Fitness", value: "high_fitness"},
                        { label: "Moderate Fitness", value: "moderate_fitness"}
                    ]
                }
            ]
        }
    ]
}

export default function SixMWPTForm({values, onChange}) {
    return (
        <CommonFormBuilder
            schema={SIXMWPT_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    )
}