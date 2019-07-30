import { Meteor } from 'meteor/meteor'
import * as schemas from './schemas'
import User from './model'

const prefix = 'users'

const Collection = Meteor.users

Object.assign(Collection, {
    _transform(item) {
        return new User(item)
    },
    ids() {
        return this.find({}, { fields: { _id: 1 } }).fetch().map(({ _id }) => _id)
    },
    getSchema(name) {
        return schemas[name]
    },
    list(query, params) {
        return this.find(query, params)
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

// Collection.after.insert((userId, { _id }) => {
//     Roles.addUsersToRoles(_id, ['user'])
// })

export {
    prefix
}
export default Collection

