import { Mongo } from 'meteor/mongo'

export default class Collection extends Mongo.Collection {
    constructor(props) {
        super(props)
        this.setPermissions()
    }

    attachSchemes(schemas = {}) {
        Object.keys(schemas).map(key => {
            this.attachSchema(schemas[key], { selector: { type: key } })
        })
    }

    getSchema(name) {
        const schemaItem = this._c2._simpleSchemas.find(({ selector: { type } }) => type === name)
        return schemaItem ? schemaItem.schema : this._c2._simpleSchemas[0].schema
    }

    setPermissions() {
        this.allow({
            insert: () => false,
            update: () => false,
            remove: () => false,
        })

        this.deny({
            insert: () => true,
            update: () => true,
            remove: () => true,
        })
    }

    ids() {
        return this.find({}, { fields: { _id: 1 } }).fetch().map(({ _id }) => _id)
    }
}
