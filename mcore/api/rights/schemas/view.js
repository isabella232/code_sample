import uniforms from 'uniforms-semantic'
import BaseViewSchema from '../../collection/schemas/view'
import ViewText from '../../../ui/uniforms/ViewText'
import ViewBoolean from '../../../ui/uniforms/ViewBoolean'

const Viewchema = BaseViewSchema
    .omit('description', 'title', 'alias')
    .extend({
        collection: {
            type: String,
            label: 'Collection',
            uniforms: ViewText
        },
        role: {
            type: String,
            label: 'Role',
            uniforms: ViewText
        },
        view: {
            type: Boolean,
            label: 'View',
            uniforms: ViewBoolean
        },
        insert: {
            type: Boolean,
            label: 'Insert',
            uniforms: ViewBoolean
        },
        update: {
            type: Boolean,
            label: 'Update',
            uniforms: ViewBoolean
        },
        remove: {
            type: Boolean,
            label: 'Remove',
            uniforms: ViewBoolean
        }
    })

export default Viewchema
