import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import SelectField from '../../../ui/uniforms/Select'
import Attributes from '..'

const AttributeSchema = new SimpleSchema({
    attributeId: {
        type: String,
        label: false,
        regEx: SimpleSchema.RegEx.Id,
        uniforms: {
            component: SelectField,
            required: false,
            multiple: false,
            search: 'attributes.staticList',
            allowAdditions: false,
            placeholder: 'Select attribute',
            options: () => Attributes.ids(),
            transformMultiple(id) {
                const item = Attributes.findOne(id)
                const res = item ? {
                    value: item._id,
                    text: item.title,
                } : {
                    value: id,
                    text: id,
                }
                return res
            }
        },
        defaultValue: ''
    },
    attributeValue: {
        type: SimpleSchema.oneOf(Number, Boolean, String),
        label: false,
        optional: true,
        autoValue() {
            const { value, field } = this
            if (value) {
                if (value === false || value === 'false') {
                    return false
                } else if (value === true || value === 'true') {
                    return true
                } else if (!isNaN(value)) {
                    const attr = Attributes.findOne(field('attributeId'))
                    const { step = 0 } = attr || {}
                    const presision = step > 0 && step < 1 ? step.toString().split('\.').pop().length : 0
                    return presision ? parseFloat(value).toPrecision(presision) : parseFloat(value)
                } else {
                    return value
                }
            }
            return value
        },
    },
})

export default AttributeSchema
