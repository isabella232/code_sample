import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import ViewText from '../../../ui/uniforms/ViewText'
import RichTextView from '../../../ui/uniforms/RichTextView'
import { formatDate } from '../../../utils'

const ViewSchema = new SimpleSchema({
    _id: {
        type: String,
        label: 'Id',
        uniforms: () => null,
    },
    alias: {
        type: String,
        label: 'Alias',
        uniforms: {
            component: ViewText
        }
    },
    title: {
        type: String,
        label: 'Title',
        uniforms: {
            component: ViewText
        }
    },
    description: {
        type: String,
        label: 'Description',
        uniforms: {
            component: RichTextView
        },
    },
    createdAt: {
        type: Date,
        label: 'CreatedAt',
        uniforms: {
            component: ViewText,
            transform(value) {
                return formatDate(value)
            }
        }
    },
    updatedAt: {
        type: Date,
        label: 'UpdatedAt',
        uniforms: {
            component: ViewText,
            transform(value) {
                return formatDate(value)
            }
        }
    },
    isActive: {
        type: Boolean,
        label: 'Is Active',
        uniforms: () => null,
    }
})

export default ViewSchema
