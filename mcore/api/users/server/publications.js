import { Meteor } from 'meteor/meteor'
import Collection, { prefix } from '..'
import { Match, check } from 'meteor/check'

Meteor.publish(`${prefix}.list`, (query = {}, params = {}) => {
    check(query, Object)
    check(params, Object)
    return Collection.list(query, params)
})

Meteor.publish(`${prefix}.single`, (id) => {
    check(id, Match.Maybe(String, null))
    return [
        Collection.find(id, {
            fields: {
                'username': 1,
                'language': 1,
                'profile': 1,
                'emails': 1,
                'roles': 1
            }
        })
    ]
})