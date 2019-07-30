import extend from "lodash/extend"

export default class Email {
    constructor(doc) {
        extend(this, doc)
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }
}