import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import ViewText from '../../../ui/uniforms/ViewText'
import ViewArray from '../../../ui/uniforms/ViewArray'

const ViewSchema = new SimpleSchema({
    username: {
        type: String,
        label: 'Username',
        uniforms: ViewText
    },
    roles: {
        type: Array,
        label: 'Roles',
        uniforms: {
            component: ViewArray
        }
    },
    'roles.$': {
        type: String,
        label: 'Role',
        uniforms: ViewText
    },
    emails: {
        type: Array,
        label: 'Emails',
        uniforms: {
            component: ViewArray,
            fieldName: 'address'
        }
    },
    'emails.$': {
        type: Object,
        label: 'Email',
        uniforms: ViewText
    }
})

export default ViewSchema
