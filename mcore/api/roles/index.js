// import BaseCollection from '../collection'
import * as schemas from './schemas'
import { ListServices } from './services'
import Model from './model'

const prefix = 'roles'

const Collection = Meteor.roles

Object.assign(Collection, {
    _transform(item) {
        return new Model(item)
    },
    getSchema(name) {
        return schemas[name]
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

export {
    prefix
}
export default Collection
