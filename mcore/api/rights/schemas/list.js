import uniforms from 'uniforms-semantic'
import ListText from '../../../ui/uniforms/ListText'
import ListBoolean from '../../../ui/uniforms/ListBoolean'
import BaseListSchema from '../../collection/schemas/list'

const ListSchema = BaseListSchema
    .omit('isActive', 'alias', 'title', 'description')
    .extend({
        collection: {
            type: String,
            label: 'Collection',
            uniforms: {
                component: ListText,
                filter: true,
                sort: true
            }
        },
        role: {
            type: String,
            label: 'Role',
            uniforms: {
                component: ListText,
                sort: true
            }
        },
        view: {
            type: Boolean,
            label: 'View',
            uniforms: ListBoolean
        },
        insert: {
            type: Boolean,
            label: 'Insert',
            uniforms: ListBoolean
        },
        update: {
            type: Boolean,
            label: 'Update',
            uniforms: ListBoolean
        },
        remove: {
            type: Boolean,
            label: 'Remove',
            uniforms: ListBoolean
        }
    })

export default ListSchema
