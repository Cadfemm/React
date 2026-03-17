import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const MFRT_SCHEMA = {
    title: "Modified Functional Reach Test",
    sections: [
        {
            fields: [
                {
                    name: "modified_functional_reach_test",
                    label: "Modified Functional Reach Test",
                    type: "radio",
                    options: [
                        { label: "Baseline", value: "baseline" },
                        { label: "Ongoing", value: "ongoing"},
                        { label: "Final", value: "final"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea"
                }
            ]
        }
    ]
}

export default function MFRTForm({values, onChange}) {
    return (
        <CommonFormBuilder
            schema={MFRT_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    )
}