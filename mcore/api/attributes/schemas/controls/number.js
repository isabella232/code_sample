import SimpleSchema from 'simpl-schema'

const NumberSchema = new SimpleSchema({
    min: {
        type: Number,
        label: 'Minimum',
    },
    max: {
        type: Number,
        label: 'Maximum',
    },
    step: {
        type: Number,
        label: 'Step',
        defaultValue: 1,
    },
    gradation: {
        type: Number,
        label: 'Gradation',
        defaultValue: 1,
    },
    units: {
        type: String,
        label: 'Units',
    },
})

export default NumberSchema
