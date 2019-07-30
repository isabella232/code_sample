import BaseViewSchema from '../../collection/schemas/view'
import ObjectLink from '../../../ui/uniforms/ObjectLink'

const Viewchema = BaseViewSchema
    .omit('title', 'alias', 'description')
    .extend({
        objectId: {
            type: String,
            label: 'GoObject',
            uniforms: {
                component: ObjectLink
            }
        },
    })

export default Viewchema
