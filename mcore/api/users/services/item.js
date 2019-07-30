import Collection from '..'

class ItemServices {
    static getItem(id) {
        const item = Collection.findOne(id)
        return {
            ...item
        }
    }

    static getTestItem() {
        const item = Collection.find({}, {limit: 1}).fetch().shift()
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
                username: 1
            }
        })
        return {
            id: last._id,
            name: last.username
        }
    }
}

export default ItemServices
