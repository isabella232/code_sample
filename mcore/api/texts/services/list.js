import Collection from '..'
import { ListServices as CommonListServices } from '../../collection/services'
import { formatDate } from '../../../utils'

class ListServices {
    static clear(query = {}) {
        return Collection.remove(query)
    }

    static recordsCount(query = {}) {
        return Collection.find(query).count()
    }

    static upsert(doc) {
        return Collection.upsert(
            { _id: doc._id },
            { $set: doc },
            { selector: { type: 'main' } }
        )
    }

    static getText(id) {
        return Collection.findOne(id)
    }

    static staticList({ query = {}, params = {} }) {
        return Collection
            .list(query, { limit: 1e4, ...params })
            .map(({ _id }) => ({ _id, alias: _id, title: _id }))
    }

    static remove = id => Collection.remove(id)

    static getSubcollections(items, all = false) {
        const subcollectionsList = {
        //     attributes: {
        //         collection: Attributes,
        //         ids: ({
        //             attributes = []
        //         }) => attributes.map(({
        //             attributeId
        //         }) => attributeId),
        //     },
        //     images: {
        //         collection: Files.collection,
        //         ids: ({
        //             images = [],
        //             logo = []
        //         }) => [
        //             ...images,
        //             ...logo
        //         ],
        //     }
        }

        return CommonListServices.getSubcollections(
            items, subcollectionsList, all
        )
    }

    static cursor(query = {}, params = {}, allSubcollections = false) {
        const items = Collection.find(this.prepareQuery(query), this.prepareParams(params))
        return [
            items,
            ...this.getSubcollections(items, allSubcollections)
        ]
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
            pubDate: formatDate(item.updatedAt || new Date())
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
