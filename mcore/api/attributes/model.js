import Model from '../collection/model'

export default class Attribute extends Model {
    prepareValueQuery(value) {
        const { paramsType } = this.params
        let condition = { $exists: true }
        if (value) {
            switch (paramsType) {
            case 'number': {
                condition = {}
                if (!isNaN(value.from)) {
                    condition.$gte = value.from
                }
                if (!isNaN(value.to)) {
                    condition.$lte = value.to
                }
                break
            }
            case 'set': {
                if (value.length) {
                    const regex = value.map(str => new RegExp(eval(`/${str}/i`)))
                    condition = { $all: regex }
                }
                break
            }
            case 'setAndColor': {
                if (value.length) {
                    const $regex = new RegExp(eval(`/${value.join('|')}/`))
                    condition = { $regex }
                }
                break
            }
            case 'directory': {
                if (value.length) {
                    const regex = value.map(str => new RegExp(eval(`/${str}/i`)))
                    condition = { $all: regex }
                }
                break
            }
            case 'string': {
                if (value.length) {
                    const regex = value.replace('/', ' ').split(' ').map(str => new RegExp(eval(`/${str}/i`)))
                    condition = { $all: regex }
                }
                break
            }
            case 'boolean': {
                condition = value
                break
            }
            default: {
                condition = value
            }
            }
        }
        return condition ? {
            attributes: {
                $elemMatch: {
                    attributeId: this._id,
                    attributeValue: condition
                }
            },
        } : {}
    }
}
