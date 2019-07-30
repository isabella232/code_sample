import BaseMainSchema from '../../collection/schemas/main'
import LongTextField from '../../../ui/uniforms/Long'
import RichTextEdit from '../../../ui/uniforms/RichTextEdit'

const MainSchema = BaseMainSchema
    .omit('alias', 'description')
    .extend({
        alias: {
            type: String,
            label: 'Alias',
        },
        description: {
            type: String,
            label: 'Description',
            optional: true,
            uniforms: LongTextField,
        },
        keywords: {
            type: String,
            label: 'Keywords',
            optional: true,
            uniforms: LongTextField,
        },
        text: {
            type: String,
            label: 'Main Text',
            optional: true,
            uniforms: {
                component: RichTextEdit
            }
        },
    })


export default MainSchema
