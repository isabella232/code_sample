import uniforms from 'uniforms-semantic'
import BaseMainSchema from '../../collection/schemas/main'
import Roles from '../../roles'
import SelectField from '../../../ui/uniforms/Select'
import { ucfirst } from '../../../utils'

const { public: { collections } } = Meteor.settings

const MainSchema = BaseMainSchema
    .omit('title', 'alias', 'description')
    .extend({
        collection: {
            type: String,
            label: 'Collection',
            uniforms: {
                component: SelectField,
                required: false,
                multiple: false,
                placeholder: 'Select Collection',
                options: () => Object.keys(collections),
                transformMultiple(id) {
                    const res = collections[id] ? {
                        value: id,
                        text: ucfirst(id)
                    } : {
                        value: id,
                        text: `Unknown: ${id}`
                    }
                    return res
                }
            }
        },
        role: {
            type: String,
            label: 'Role',
            uniforms: {
                component: SelectField,
                required: false,
                multiple: false,
                placeholder: 'Select Role',
                options: () => Roles.find().fetch().map(({ name }) => name),
                transformMultiple(id) {
                    const item = Roles.findOne({ name: id })
                    const res = item ? {
                        value: item.name,
                        text: ucfirst(item.name),
                    } : {
                        value: id,
                        text: id,
                    }
                    return res
                }
            }
        },
        view: {
            type: Boolean,
            label: 'View',
            optional: true,
            defaultValue: false
        },
        insert: {
            type: Boolean,
            label: 'Insert',
            optional: true,
            defaultValue: false
        },
        update: {
            type: Boolean,
            label: 'Update',
            optional: true,
            defaultValue: false
        },
        remove: {
            type: Boolean,
            label: 'Remove',
            optional: true,
            defaultValue: false
        },
    })


export default MainSchema
