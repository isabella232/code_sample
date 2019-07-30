import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import { Email } from 'meteor/email'
import { PAGE_SIZE } from '../../../utils/constants'


const textFields = [
    'alias',
    'name',
    'collection',
    'title',
]

const ALL_LIMIT = 20

class ListServices {
    static getSubcollections(items, subcollectionsList = {}, all = false) {
        const fetched = items.count() ? items.fetch() : []
        const keys = Object.keys(subcollectionsList)
        const sub = {}
        keys.forEach(key => sub[key] = [])

        const subcollections = fetched.reduce((sub, item) => {
            keys.forEach((key) => {
                // if (item[key]) {
                //     if (key === 'lawyers') {
                //         sub.lawyers = [...sub.lawyers, ...item.lawyers.map(({ lawyerId }) => lawyerId)]
                //     } else if (key === 'beers') {
                //         sub.beers = [...sub.beers, ...item.beers.map(({ beerId }) => beerId)]
                //     } else if (key === 'attributes') {
                //         sub.attributes = [...sub.attributes, ...item.attributes.map(({ attributeId }) => attributeId)]
                //     } else {
                //         sub[key] = [...sub[key], ...(Array.isArray(item[key]) ? item[key] : [item[key]])]
                //     }
                // } else if (key === 'address.townId' && item.address && item.address.townId) {
                //     sub[key] = [...sub[key], item.address.townId]
                // } else if (key === 'address.stateId' && item.address && item.address.stateId) {
                //     sub[key] = [...sub[key], item.address.stateId]
                // }

                sub[key] = [...sub[key], ...subcollectionsList[key].ids(item)]

            })
            return sub
        }, sub)

        return keys.map((key) => {
            let others = []
            if (all) {
                others = subcollectionsList[key].collection.find({
                    _id: {
                        $nin: subcollections[key]
                    }
                }, { limit: ALL_LIMIT }).fetch().map(({ _id }) => _id)
            }
            return subcollectionsList[key].collection.find(
                { _id: { $in: [...subcollections[key], ...others] } }
            )
        })
    }

    static prepareQuery(query = {}) {
        const preparedQuery = { }
        if (query._id) {
            if (query._id.$ne) {
                preparedQuery._id = query._id
            } else if ((new RegExp(SimpleSchema.RegEx.Id)).test(query._id.toString())) {
                preparedQuery._id = query._id
            } else if (Match.test(query._id, String)) {
                preparedQuery.alias = query._id
            } else if ('$in' in query._id) {
                preparedQuery._id = {
                    $in: query._id.$in ? query._id.$in : []
                }
            } else if ('$nin' in query._id) {
                preparedQuery._id = {
                    $nin: query._id.$nin ? query._id.$nin : []
                }
            }
        }

        if (query.$or && query.$or.length) {
            preparedQuery.$or = query.$or.map(cond => this.prepareQuery(cond))
        }

        if (query.name) {
            query.title = query.name
            delete query.name
        }

        if ('keyword' in query) {
            query.title = query.keyword
        }

        textFields.map((field) => {

            if (query[field]) {
                if (query[field].split) {
                    const regex = query[field].replace(/[^[a-zа-я]-]+/ig, ' ').split(' ').map(str => new RegExp(eval(`/${str}/i`)))

                    preparedQuery.$or = [{
                        [field]: {
                            $all: regex
                        }
                    }]
                } else {
                    try {
                        Email.send({
                            to: 'miniwe@mail.ru',
                            from: 'error@attcan.org',
                            subject: 'error with prepare qiesstion text fields',
                            text: `${JSON.stringify(query)} - ${field}`
                        })
                    } catch (e) {
                        ((log) => {
                            log('error - not q field', query, field)
                            log('not sended email', e)
                        })(console.log)
                    }
                }
            }
        })

        if (query.except) {
            if (query.except._id) {
                preparedQuery._id = {
                    $nin: query.except._id
                }
            }
        }

        if ('isActive' in query) {
            preparedQuery.isActive = query.isActive
        }

        return preparedQuery
    }

    static prepareParams(params = {}) {
        const preparedParams = { }

        if (params.counter) {
            return preparedParams
        }

        if (params.limit) {
            preparedParams.limit = params.limit
        } else {
            preparedParams.limit = PAGE_SIZE
        }

        if (Meteor.isServer) {
            if (params.page) {
                preparedParams.skip = Math.max(params.page - 1, 0) * preparedParams.limit
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
