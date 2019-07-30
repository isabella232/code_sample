import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { check } from 'meteor/check'
import Collection, { prefix } from '..'
import { rateLimit } from '../../../utils'
import MainSchema from '../schemas/main'
import ProfileSchema from '../schemas/profile'

export const upsertUser = new ValidatedMethod({
    name: `${prefix}.upsert`,
    validate: (data) => {
        MainSchema.validator({
            clean: true
        })
    },
    run(doc) {
        if (doc._id) {
            // const emails = doc.emails
            delete doc.emails /** @todo correct update emails after */
            if (doc.password) {
                Accounts.setPassword(doc._id, doc.password)
            } else {
                delete doc.password
            }
            Roles.addUsersToRoles(doc._id, doc.roles)
            return Collection.upsert({
                _id: doc._id,
            }, {
                $set: doc,
            })
        } else {
            throw new Meteor.Error(prefix, 'User must register self first')
        }
    },
})

export const profileUpdate = new ValidatedMethod({
    name: `${prefix}.profile.update`,
    validate: ProfileSchema.validator(),
    run(user) {
        if (user._id) {
            if (user.password) {
                Accounts.setPassword(user._id, user.password, {
                    logout: false
                })
            } else {
                delete user.password
            }
            return Collection.upsert({
                _id: user._id,
            }, {
                $set: user
            })
        } else {
            throw new Meteor.Error('users', 'Update profile failed')
        }
    },
})

export const removeUser = new ValidatedMethod({
    name: `${prefix}.remove`,
    validate(id) {
        check(id, String)
    },
    run(id) {
        return Collection.remove(id)
    },
})

rateLimit({
    methods: [upsertUser, removeUser, profileUpdate],
    limit: 5,
    timeRange: 1000,
})
