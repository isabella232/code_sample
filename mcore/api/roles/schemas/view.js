import uniforms from 'uniforms-semantic'
import BaseViewSchema from '../../collection/schemas/view'
import ViewText from '../../../ui/uniforms/ViewText'

const ViewSchema = BaseViewSchema
    .omit('alias', 'title', 'description')
    .extend({
        name: {
            type: String,
            label: 'Name',
            uniforms: ViewText
        }
    })

export default ViewSchema
