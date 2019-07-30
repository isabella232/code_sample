import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import ListText from '../../../ui/uniforms/ListText'
import ListArray from '../../../ui/uniforms/ListArray'

const ListSchema = new SimpleSchema({
    username: {
        type: String,
        label: 'Username',
        uniforms: ListText
    },
    roles: {
        type: Array,
        label: 'Roles',
        uniforms: ListArray
    },
    'roles.$': {
        type: String,
        label: 'Role',
        uniforms: ListText
    },
    emails: {
        type: Array,
        label: 'Emails',
        uniforms: ListArray
    },
    'emails.$': {
        type: Object,
        label: 'Email',
        uniforms: ListText
    },
    createdAt: {
        type: String,
        label: 'Created At',
        uniforms: {
            component: ListText,
            transform(value) {
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC',
                    timeZoneName: 'short'
                }
                return new Date(value).toLocaleDateString('en-US', options)
            }
        }
    },
})

export default ListSchema
