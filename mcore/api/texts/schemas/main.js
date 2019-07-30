import BaseMainSchema from '../../collection/schemas/main'
import RichTextEdit from '../../../ui/uniforms/RichTextEdit'
import ObjectLink from '../../../ui/uniforms/ObjectLink'

const MainSchema = BaseMainSchema
    .omit('title', 'alias', 'description', 'isActive')
    .extend({
        typeId: {
            type: String,
            label: 'Type',
            uniforms: () => null
        },
        text: {
            type: String,
            label: false,
            uniforms: RichTextEdit,
            optional: true
        },
        objectId: {
            type: String,
            label: 'GoObject',
            uniforms: {
                component: ObjectLink
            }
        },
    })


export default MainSchema
