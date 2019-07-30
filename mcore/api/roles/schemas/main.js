import BaseMainSchema from '../../collection/schemas/main'

const MainSchema = BaseMainSchema
    .omit('alias', 'title', 'description')
    .extend({
        name: {
            type: String,
            label: 'Name'
        },
    })


export default MainSchema
