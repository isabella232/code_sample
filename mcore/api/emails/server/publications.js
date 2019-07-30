import { Meteor } from 'meteor/meteor'
import { Counts } from 'meteor/ros:publish-counts'
import { Match, check } from 'meteor/check'
import Collection, { prefix } from '..'

Meteor.publish(`${prefix}.counts`, function (query = {}) {
    check(query, Object)
    Counts.publish(this, `${prefix}.counts`, Collection.list(query, {
        limit: 1000
    }))
})


Meteor.publish(`${prefix}.list`, (query = {}, params = {}) => {
    check(query, Object)
    check(params, Object)
    return [
        Collection.list(query, params),
    ]
})

Meteor.publish(`${prefix}.single`, (id) => {
    check(id, Match.Maybe(String, null))
    return [
        Collection.list({_id: id}),
    ]
})
