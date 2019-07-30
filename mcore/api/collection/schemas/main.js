import SimpleSchema from 'simpl-schema'
import uniforms from 'uniforms-semantic'
import RichTextEdit from '../../../ui/uniforms/RichTextEdit'
import { slugify } from '../../../utils'

const MainSchema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        uniforms: () => null,
        optional: true,
        label: 'Id',
    },
    title: {
        type: String,
        label: 'Title',
    },
    alias: {
        type: String,
        label: 'Alias',
        optional: true,
        index: true,
        unique: true,
        autoValue() {
            const { value } = this
            const title = this.field('title').value
            if (!value && title) {
                return slugify(title)
            }
            return value
        },
    },
    description: {
        type: String,
        label: 'Description',
        optional: true,
        uniforms: RichTextEdit,
    },
    isActive: {
        type: Boolean,
        label: 'Is Active',
        defaultValue: true,
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
        optional: true,
    },
    updatedAt: {
        type: Date,
        index: 1,
        uniforms: () => null,
        autoValue() {
            return new Date()
        },
        optional: true,
    },
})

export default MainSchema
