import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { check } from 'meteor/check'
// import Files from './s3-collection'
import { rateLimit } from '../../../utils'
import Files from '..'

export const filesOrder = new ValidatedMethod({
    name: 'files.order',
    validate(orderedList) {
        check(orderedList, [String])
    },
    run(orderedList) {
        orderedList.forEach((_id, index) => {
            Files.collection.update(_id, { $set: { 'meta.order': index } })
        })
    },
})
export const fileRemove = new ValidatedMethod({
    name: 'file.remove',
    validate(id) {
        check(id, String)
    },
    run(id) {
        Files.unassignFromObject(id)
        const file = Files.findOne({ _id: id })
        if (file) {
            file.remove()
        } else {
            throw new Meteor.Error('500', 'File Not Found')
        }
    },
})

export const fileLink = new ValidatedMethod({
    name: 'files.getImageLink',
    validate(id) {
        check(id, String)
    },
    run(id) {
        const file = Files.findOne({
            'meta.controlId': id
        })
        return file ? file.link() : ''
    },
})

export const fileRename = new ValidatedMethod({
    name: 'file.rename',
    validate({
        id,
        name
    }) {
        check(id, String)
        check(name, String)
    },
    run({
        id,
        name
    }) {
        return Files.update({
            _id: id
        }, {
            $set: {
                name
            }
        }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    },
})

export const fileCopy = new ValidatedMethod({
    name: 'file.copy',
    validate({
        id,
        newId
    }) {
        check(id, String)
        check(newId, String)
    },
    run({
        id,
        newId
    }) {
        return Files.copyFile(id, newId)
    },
})

rateLimit({
    methods: [fileRemove, filesOrder, fileRename, fileLink, fileCopy],
    limit: 5,
    timeRange: 1000,
})
