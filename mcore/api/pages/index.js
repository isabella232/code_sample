import BaseCollection from '../collection'
import * as schemas from './schemas'
import { ListServices } from './services'
import Model from './model'

const prefix = 'pages'

class _Collection extends BaseCollection {
    transform(item) {
        return new Model(item)
    }

    list(query, params) {
        return this.find(ListServices.prepareQuery(query), ListServices.prepareParams(params))
    }
}

const Collection = new _Collection(prefix)
Collection.attachSchemes(schemas)

export {
    prefix
}
export default Collection
