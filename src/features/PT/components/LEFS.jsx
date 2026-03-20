import CommonFormBuilder from "../../CommonComponenets/FormBuilder"


const LEFS_SCALE = [
  { label: "Extreme difficulty/unable to perform activity (0)", value: 0 },
  { label: "Quite a bit of difficulty (1)", value: 1 },
  { label: "Moderate difficulty (2)", value: 2 },
  { label: "A little bit of difficulty (3)", value: 3 },
  { label: "No difficulty (4)", value: 4 }
];

const LEFS_SCHEMA = {
    title: "Lower Extremity Functional Scale",
    sections: [
        {
            fields: [
                {
                    name: "lefs_1",
                    label: "1. Any of your usual work, housework or school activities",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_2",
                    label: "2. Usual hobbies, recreational or sporting activities",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_3",
                    label: "3. Getting into or out of the bath",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_4",
                    label: "4. Walking between rooms",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_5",
                    label: "5. Putting on your shoes or socks",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_6",
                    label: "6. Squatting",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_7",
                    label: "7. Lifting an object, like a bag of groceries from the floor",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_8",
                    label: "8. Performing light activities around your home",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_9",
                    label: "9. Performing heavy activities around your home",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_10",
                    label: "10. Getting out of a car",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_11",
                    label: "11. Walking 2 blocks",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_12",
                    label: "12. Walking a mile/1.6KM",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_13",
                    label: "13. Going up or down 10 stairs (about 1 flight of stairs)",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_14",
                    label: "14. Standing for 1 hour",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_15",
                    label: "15. Sitting for 1 hour",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_16",
                    label: "16. Running on even ground",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_17",
                    label: "17. Running on uneven ground",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_18",
                    label: "18. Making sharp turn while running fast",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_19",
                    label: "19. Hopping",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "lefs_20",
                    label: "20. Rolling over in bed",
                    type: "radio-matrix",
                    options: LEFS_SCALE
                },
                {
                    name: "column_total",
                    label: "Column Total",
                    type: "grid-row",
                    cols: [
                        { type: "input", name: "extreme_difficulty_score"},
                        { type: "input", name: "quite_difficulty_score" },
                        { type: "input", name: "moderate_difficulty_score" },
                        { type: "input", name: "little_difficulty_score" },
                        { type: "input", name: "no_difficulty_score" },
                    ]
                },
                {
                    name: "total_score",
                    label: "Total Score",
                    type: "score-box"
                }
            ]
        }
    ]
}

const calculateScore = (values) => {
    var column_2 = 0
    var column_3 = 0
    var column_4 = 0
    var column_5 = 0
    var total_score = 0

    for (let i=1; i<=20; i++){
        const number = values[`lefs_${i}`]
        if (!number) {
            continue
        }
        if (number === 1) {
            column_2 += number
        } else if (number === 2) {
            column_3 += number
        } else if (number === 3) {
            column_4 += number
        } else if (number === 4) {
            column_5 += number
        }
        total_score += number
    }
    return {
        'total_score': total_score,
        'no_difficulty_score': column_5,
        'quite_difficulty_score': column_2,
        'little_difficulty_score': column_4,
        'moderate_difficulty_score': column_3
    }
}

export default function LEFSForm({values, onChange}) {
    const score = calculateScore(values)
    const computedValues = {
        ...values,
        extreme_difficulty_score: '0',
        total_score: score['total_score'] + '/80',
        no_difficulty_score: score['no_difficulty_score'],
        quite_difficulty_score: score['quite_difficulty_score'],
        little_difficulty_score: score['little_difficulty_score'],
        moderate_difficulty_score: score['moderate_difficulty_score']
    }
    return (
        <CommonFormBuilder
            schema={LEFS_SCHEMA}
            values={computedValues}
            onChange={onChange}
            layout="nested"
        />
    )
}