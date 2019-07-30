import uniforms from 'uniforms-semantic'
import BaseListSchema from '../../collection/schemas/list'
import ListText from '../../../ui/uniforms/ListText'

const ListSchema = BaseListSchema
    .omit('alias', 'title', 'description')
    .extend({
        name: {
            type: String,
            label: 'Name',
            uniforms: ListText
        }
    })

export default ListSchema
