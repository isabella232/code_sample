// import { ListServices as CommonListServices } from '../../collection/services'
import { formatDate } from '../../../utils'
import Collection from '..'

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
