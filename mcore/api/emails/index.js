import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import extend from 'lodash/extend'
import MainSchema from './schemas/main'
import ListSchema from './schemas/list'
import ViewSchema from './schemas/view'
import Model from './model'
import { ListServices } from './services'

const prefix = 'emails'

const Collection = new Mongo.Collection(prefix, {
    transform(item) {
        return new Model(item)
    }
})

extend(Collection, {
    getSchema(name) {
        let schema
        switch (name) {
            case 'list':
                schema = ListSchema
                break
            case 'view':
                schema = ViewSchema
                break
            default:
                schema = MainSchema
        }
        return schema
    },

    ids() {
        return this.find({}, {
            fields: {
                _id: 1
            }
        }).fetch().map(item => item._id)
    },
    list(query, params) {
        return this.find(ListServices.prepareQuery(query), ListServices.prepareParams(params))
    }
})

Collection.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Collection.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Collection.attachSchema(MainSchema, { selector: { type: 'main' } })
Collection.attachSchema(ListSchema, { selector: { type: 'list' } })
Collection.attachSchema(ViewSchema, { selector: { type: 'view' } })


export {
    prefix
}
export default Collection
