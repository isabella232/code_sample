import BaseListSchema from '../../collection/schemas/list'
import ListText from '../../../ui/uniforms/ListText'

const ListSchema = BaseListSchema
    .omit('alias', 'isActive')
    .extend({
        code: {
            type: String,
            label: 'Code',
            uniforms: {
                component: ListText
            },
        },
    })

export default ListSchema
