import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import SelectFile from '../../../ui/uniforms/Select'

const FileSelectSchema = new SimpleSchema({
    file: {
        type: String,
        label: false,
        uniforms: {
            component: SelectFile,
        },
        optional: true,
    },
})

export default FileSelectSchema
