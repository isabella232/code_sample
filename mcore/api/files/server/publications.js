import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
// import Files from './s3-collection'
import Files from '..'

Meteor.publish('files.list', (query = {}, params = { }) => {
    check(query, Object)
    check(params, Object)
    return Files.collection.find(query, Object.assign({
        sort: {
            'meta.uploadedAt': -1
        }
    }, params))
})
