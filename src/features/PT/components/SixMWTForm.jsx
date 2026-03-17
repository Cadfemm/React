import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SIXMWT_SCHEMA = {
    title: "6 Minutes Walk Test",
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
                }
            ]
        }
    ]
}

export default function SixMWTForm({values, onChange}) {
    return (
        <CommonFormBuilder
            schema={SIXMWT_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    )
}