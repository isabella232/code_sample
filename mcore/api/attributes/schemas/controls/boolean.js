import SimpleSchema from 'simpl-schema'

const BooleanSchema = new SimpleSchema({
    yes: {
        type: String,
        label: 'Yes',
        defaultValue: 'Yes',
    },
    no: {
        type: String,
        label: 'No',
        defaultValue: 'No',
    },
})

export default BooleanSchema
