import SimpleSchema from 'simpl-schema'
import SelectField from '../../../../ui/uniforms/Select'

const collections = {
    towns: 'Towns',
    lawyers: 'Lawyers',
    tags: 'Tags',
    firms: 'Firms',
    areas: 'Areas',
    attributes: 'Attributes',
}

const DirectorySchema = new SimpleSchema({
    directory: {
        type: String,
        label: 'Directory',
        allowedValues: () => Object.keys(collections),
        uniforms: {
            component: SelectField,
            transformMultiple(id) {
                return {
                    value: id,
                    text: collections[id] ? collections[id] : id,
                }
            },
        },
        defaultValue: ''
    },
    multiple: {
        type: Boolean,
        label: 'Multiple',
        defaultValue: false,
    },
})

export default DirectorySchema
