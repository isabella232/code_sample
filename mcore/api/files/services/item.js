import Collection from '..'
// import { ItemServices as CommonItemServices }  from '../../collection/services'

class ItemServices {
    static getItem(id) {
        const item = Collection.findOne(id)
        return {
            ...item
        }
    }

    static getTestItem() {
        const item = Collection.find({}, { limit: 1 }).fetch().shift()
        return {
            ...item
        }
    }

    static getLast() {
        const last = Collection.findOne({}, {
            sort: {
                updatedAt: -1
            },
            fields: {
                _id: 1,
                title: 1
            }
        })
        return last ? { id: last._id, title: last.title } : { id: null, title: 'n/a' }
    }
}

export default ItemServices
