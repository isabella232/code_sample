import SimpleSchema from 'simpl-schema'

const SetSchema = new SimpleSchema({
    items: {
        type: Array,
        label: 'Items',
    },
    'items.$': {
        type: String,
        label: 'Item',
    },
    multiple: {
        type: Boolean,
        label: 'Multiple',
        defaultValue: false,
    }
})

export default SetSchema
