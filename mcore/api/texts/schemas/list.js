import BaseListSchema from '../../collection/schemas/list'
import ListText from '../../../ui/uniforms/ListText'

const ListSchema = BaseListSchema
    .omit('title', 'alias', 'description', 'isActive')
    .extend({
        title: {
            type: String,
            uniforms: {
                component: ListText,
                transform() {
                    return `${this.findValue('typeId')}: ${this.findValue('_id')}`
                }
            }
        }
    })

export default ListSchema
