import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import { default as RichTextEdit } from '../../../ui/uniforms/RichTextEdit'
import { SHORT_EDITOR_CONFIG } from '../../../utils/constants'

const MainSchema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        uniforms: () => null,
        optional: true,
        label: 'Id'
    },
    _name: {
        type: String,
        label: 'Name'
    },
    subject: {
        type: String,
        label: 'Subject'
    },
    body: {
        type: String,
        label: 'Body',
        optional: true,
        uniforms: {
            component: RichTextEdit,
            config: SHORT_EDITOR_CONFIG,
        },
    },
    isDeleted: {
        type: Boolean,
        label: 'Is Deleted',
        defaultValue: false
    },
    createdAt: {
        type: Date,
        uniforms: () => null,
        autoValue() {
            if (this.isInsert) {
                return new Date()
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                }
            }
            return this.unset()
        },
        optional: true
    },
    updatedAt: {
        type: Date,
        uniforms: () => null,
        autoValue() {
            return new Date()
        },
        optional: true
    }
})

export default MainSchema
