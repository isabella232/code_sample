import { Meteor } from 'meteor/meteor'
import Collection from '..'
import { PAGE_SIZE } from '../../../utils/constants'

class ListServices {
    static createComment(comment) {
        return Collection.insert(comment)
    }

    static list() {
        return Collection.find().fetch()
    }

    static recordsCount() {
        return Collection.find().count()
    }

    static remove(query) {
        return Collection.remove(query)
    }

    static prepareQuery(query = {}) {
        const preparedQuery = {}
        if (query._id) {
            preparedQuery._id = query._id
        }
        if (query.name) {
            const regex = new RegExp(eval('/' + query.name.split(' ').join('|') + '/i'))
            preparedQuery.$or = [{
                title: {
                    $regex: regex
                }
            }]
        }
        if (query.except) {
            if (query.except._id) {
                preparedQuery._id = {
                    $nin: query.except._id
                }
            }
        }
        return preparedQuery
    }

    static prepareParams(params = {}) {
        const preparedParams = {}
        if (params.limit) {
            preparedParams.limit = params.limit
        } else {
            preparedParams.limit = PAGE_SIZE
        }
        if (Meteor.isServer) {
            if (params.page) {
                preparedParams.skip = (params.page - 1) * PAGE_SIZE
                preparedParams.skip = preparedParams.skip < 0 ? 0 : preparedParams.skip
            }
        }

        const sortOrder = params.order ? params.order : -1
        preparedParams.sort = {}
        if (params.sort) {
            preparedParams.sort[params.sort] = sortOrder
        } else {
            preparedParams.sort = {
                updatedAt: sortOrder
            }
        }
        return preparedParams
    }
}

export default ListServices
