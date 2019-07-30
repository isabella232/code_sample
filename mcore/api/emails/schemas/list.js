import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
// import ListText from '../../../ui/components/uniforms/ListText'
// import ListBoolean from '../../../ui/components/uniforms/ListBoolean'

const ListSchema = new SimpleSchema({
    _name: {
        type: String,
        label: 'Name',
        uniforms: {
            // component: ListText,
            // filter: true
        }
    },
    subject: {
        type: String,
        label: 'Subject',
        uniforms: {
            // component: ListText,
            // filter: true
        }
    },
    isDeleted: {
        type: Boolean,
        label: 'Is Deleted',
        uniforms: {
            // label: false,
            // component: ListBoolean,
            // state: true
        }
    }
})

export default ListSchema