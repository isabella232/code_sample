import { Counts } from 'meteor/ros:publish-counts'
import { check, Match } from 'meteor/check'
import CollectionPublications from '../../collection/server/publications'
import { prefix } from '..'
import { ListServices } from '../services'

const publications = new CollectionPublications({ prefix })

publications.register('counts', {
    validate(query = {}) {
        check(query, Object)
    },
    publication(query) {
        Counts.publish(this, `${prefix}.counts`, ListServices.cursor(query, { counter: true }), {
            fastCount: true
        })
    }
})

publications.register('list', {
    validate(query = {}, params = {}) {
        check(query, Object)
        check(params, Object)
    },
    publication(query, params) {
        return ListServices.cursor(query, params)
    }
})

publications.register('single', {
    validate(id, params = {}) {
        check(id, Match.Maybe(String, undefined))
        check(params, Match.Maybe(Object, undefined))
    },
    publication(id, params = {}) {
        return ListServices.cursorSingle({
            _id: id
        }, params)
    }
})
