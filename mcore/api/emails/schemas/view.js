import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import ViewText from '../../../ui/uniforms/ViewText'

const ViewSchema = new SimpleSchema({
    _id: {
        type: String,
        label: 'Id',
        uniforms: () => null,
    },
    _name: {
        type: String,
        label: 'Name',
        uniforms: {
            component: ViewText
        }
    },
    subject: {
        type: String,
        label: 'Subject',
        uniforms: {
            component: ViewText
        }
    },
    isDeleted: {
        type: Boolean,
        label: 'Is Deleted',
        uniforms: () => null,
    }
})

export default ViewSchema