import Collection from '..'
import { ListServices as CommonListServices } from '../../collection/services'
import {
    doClear, stripTags, formatDate
} from '../../../utils'

class ListServices {
    static defaultList() {
        return Collection.find().fetch()
    }

    static clear(query = {}) {
        return Collection.remove(query)
    }

    static recordsCount() {
        return Collection.find().count()
    }

    static upsert(doc) {
        return Collection.upsert(
            { _id: doc._id },
            { $set: doc },
            { selector: { type: 'main' } }
        )
    }

    static getHeadData(path, model) {
        const { siteName, domain } = Meteor.settings.public
        return model ? {
            title: `${model.title}`,
            description: `${model.description}; ${model.text && stripTags(doClear(model.text)).slice(0, 255)}`,
            keywords: model.keywords,
            url: `${domain}${path}`
        } : {
            title: siteName,
            description: '',
            keywords: '',
            url: `${domain}${path}`
        }
    }

    static getPage(alias) {
        return Collection.findOne({
            alias
        })
    }

    static staticList({ query = {}, params = {} }) {
        return Collection
            .list(query, { limit: 1e4, ...params })
            .map(({ _id, alias, title }) => ({ _id, alias, title }))
    }

    static remove = (id) => {
        return Collection.remove(id)
    }

    static cursor(query = {}, params = {}, allSubcollections = false) {
        return Collection.find(this.prepareQuery(query), this.prepareParams(params))
    }

    static cursorSingle(query = {}, params = {}) {
        return this.cursor(query, params, true)
    }

    /** @depricated */
    static list(query = {}, params = {}) {
        const list = this.cursor(query, params).fetch()

        return list.map((item, index) => ({
            ...item,
            index,
            pubDate: formatDate(item.updatedAt)
        }))
    }

    static getAlias(alias) {
        const count = Collection.find({
            alias: new RegExp(`${alias}(-\\d+)?`, 'gi'),
        }).count()
        return (count > 0) ? `${alias}-${count}` : alias
    }

    static prepareQuery(query = {}) {
        const preparedQuery = CommonListServices.prepareQuery(query)
        return preparedQuery
    }

    static prepareParams(params = {}) {
        const preparedParams = CommonListServices.prepareParams(params)
        return preparedParams
    }
}

export default ListServices
