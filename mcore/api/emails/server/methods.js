import { Meteor } from 'meteor/meteor'
// import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { check } from 'meteor/check'
import Collection, { prefix } from '..'
import { rateLimit } from '../../../utils'
import MainSchema from '../schemas/main'
import { MailServices } from '../services'

export const upsertItem = new ValidatedMethod({
    name: `${prefix}.upsert`,
    validate: MainSchema.validator({
        clean: true
    }),
    run(doc) {
        return Collection.upsert({
            _id: doc._id
        }, {
            $set: doc
        }, {
            selector: {
                type: 'main'
            }
        })
    }
})

export const removeItem = new ValidatedMethod({
    name: `${prefix}.remove`,
    validate(id) {
        check(id, String)
    },
    run(id) {
        return Collection.remove(id)
    }
})

export const sendEmail = new ValidatedMethod({
    name: `${prefix}.send`,
    validate({userId, emailId}) {
        check(userId, String)
        check(emailId, String)
    },
    run({userId, emailId}) {
        // return MailServices.send(userId, emailId)
        throw new Error('this mail send disabled')
    }
})

rateLimit({
    methods: [
        upsertItem,
        removeItem,
        sendEmail
    ],
    limit: 5,
    timeRange: 1000
})
