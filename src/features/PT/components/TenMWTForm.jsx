import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TENMWT_SCHEMA = {
    title: "10 Meter Walk Test",
    sections: [
        {
            fields: [
                {
                    min: 0,
                    name: "meter",
                    label: "Meter",
                    type: "input-number-range"
                },
                {
                    min: 0,
                    name: "seconds",
                    label: "Seconds",
                    type: "input-number-range",
                },
                {
                    name: "meter_per_seconds",
                    label: "m/s",
                    type: "input",
                    readOnly: "true"
                }
            ]
        }
    ]
}

export default function TenMWTForm({values, onChange}) {
    const computedValues = {
        ...values,
        meter_per_seconds: values.meter / values.seconds
    }

    return (
        <CommonFormBuilder
            schema={TENMWT_SCHEMA}
            values={computedValues}
            onChange={onChange}
            layout="nested"
        />
    )
}