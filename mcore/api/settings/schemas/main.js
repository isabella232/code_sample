import BaseMainSchema from '../../collection/schemas/main'

const MainSchema = BaseMainSchema
    .omit('alias', 'description')
    .extend({
        code: {
            type: String,
            label: 'Code'
        },
        value: {
            type: String,
            label: 'Value'
        },
    })


export default MainSchema
