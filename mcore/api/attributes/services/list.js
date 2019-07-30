import Collection from '..'
import { ListServices as CommonListServices } from '../../collection/services'
import {
    formatDate, ucfirst
} from '../../../utils'

const defaultPriceAtts = {
    alias: 'price',
    title: 'Цена',
    group: 'lawyers',
    params: {
        paramsType: 'number',
        paramsData: {
            min: 0,
            max: 1e3,
            step: 50,
            gradation: 5,
            units: '₽',
        },
    },
    isFilter: true,
}

function stackTrace() {
    var err = new Error();
    return err.stack;
}

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

    static remove(query) {
        return Collection.remove(query)
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

    static cursor(query = {}, params = {}, allSubcollections = false) {
        return Collection.find(this.prepareQuery(query), this.prepareParams(params))
    }

    static cursorSingle(query = {}, params = {}) {
        return this.cursor(query, params, true)
    }

    static filters(query = {}, params = {}) {
        return this.list(query, params)
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

        if (query.group) {
            preparedQuery.group = query.group
        }

        if ('isFilter' in query) {
            preparedQuery.isFilter = query.isFilter
        }

        return preparedQuery
    }

    static prepareParams(params = {}) {
        const preparedParams = CommonListServices.prepareParams(params)

        return preparedParams
    }

    static getPriceId() {
        return this.getPriceAttr()._id
    }


    static getPriceAttr() {
        return this.getAttr('price', defaultPriceAtts)
    }

    static getDefaultParamsData(paramsType, defaultParamsData = {}) {
        let paramsData = {}
        switch (paramsType) {
        case 'set':
            paramsData = {
                items: [],
                multiple: false,
            }
            break
        case 'set':
            paramsData = {
                items: [],
                multiple: false,
            }
            break
        case 'directory':
            paramsData = {
                directory: '',
                multiple: false,
            }
            break
        case 'string':
            paramsData = {}
            break
        case 'number':
            paramsData = {
                min: 0,
                max: 1e3,
                step: 50,
                gradation: 5,
                units: '',
            }
            break
        case 'boolean':
            paramsData = {
                yes: 'Yes',
                no: 'No',
            }
            break
        default:
            break
        }
        return Object.assign(paramsData, defaultParamsData)
    }

    static getNewAttrDetails({ alias, paramsType, ...details }) {
        const attrDetails = {
            alias,
            title: details.title ? details.title : ucfirst(alias),
            group: details.group ? details.group : 'lawyers',
            isFilter: details.isFilter ? details.isFilter : false,
            params: {
                paramsType,
                paramsData: this.getDefaultParamsData(paramsType, details.paramsData),
            },
        }

        return attrDetails
    }

    static getAttrId(alias) {
        return this.getAttr(alias)._id
    }

    static getAttr(alias, defaultAtts = {}) {
        const attr = Collection.findOne({
            alias
        })

        if (attr) {
            return attr
        }
        if (Meteor.isServer) {
            const insertData = this.getNewAttrDetails(Object.assign(defaultAtts, { alias }))
            const newAttrId = Collection.insert(
                insertData,
                { selector: { type: 'main' } },
            )
            return Collection.findOne(newAttrId)
        } else {
            return false
        }
    }
}

export default ListServices
