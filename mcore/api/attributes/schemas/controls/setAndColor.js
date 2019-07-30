import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'

const SetAndColorSchema = new SimpleSchema({
    items: {
        type: Array,
        label: 'Items',
        uniforms: {
            className: 'sixteen wide column'
        }
    },
    'items.$': {
        type: Object,
        label: 'Item',
        uniforms: {
            className: 'ui grid inline-grouped'
        }

    },
    'items.$.title': {
        type: String,
        label: 'Title',
        uniforms: {
            className: 'ten wide column'
        }
    },
    'items.$.color': {
        type: String,
        label: 'Color',
        uniforms: {
            className: 'six wide column',
            type: 'color'
        }
    },
    multiple: {
        type: Boolean,
        label: 'Multiple',
        defaultValue: false,
        uniforms: {
            className: 'sixteen wide column'
        }

    }
})

export default SetAndColorSchema
